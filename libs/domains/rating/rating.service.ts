import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating.interface';
import { IUpdateRating } from './interface/update.rating.interface';
import { IScopeRating } from './interface/scope.rating.interface';
import { CronService } from 'libs/services/cron/cron.service';
import { IFilter } from '../../shared/interface/filter.interface';
import { IOrder } from '../../shared/interface/order.interface';
@Injectable()
export class RatingService {
  constructor(
    private prisma: PrismaService,
    private cronService: CronService,
  ) {}

  async createRating(createrId: number, rating: ICreateRating) {
    const scope = rating.scope;
    delete rating.scope;
    const createdRating = await this.prisma.rating.create({
      data: { ...rating, createrId: createrId },
    });

    await this.deleteAndCreateRatingsScope(createdRating.id, scope);
    if (rating.minuteUpdate) {
      this.cronService.addInterval(
        `rating-${createdRating.id}`,
        1000 * 60 * rating.minuteUpdate,
        () => this.updateRatingScore(createdRating.id),
      );
    }
    return createdRating;
  }
  async getPage(
    limit: number,
    page: number,
    filters: IFilter[] = [],
    orderProps: IOrder,
  ) {
    let whereOptions = {};
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.rating.count({ where: whereOptions });
    const ratings = await this.prisma.rating.findMany({
      where: whereOptions,
      orderBy: orderProps,
      take: limit,
      skip: offset,
      include: {
        creater: {
          select: {
            name: true,
            surname: true,
          },
        },
      },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      rows: ratings,
    };
  }
  async getById(id: number) {
    return this.prisma.rating.findUnique({
      where: { id: id },
    });
  }
  async updateRating(id: number, rating: IUpdateRating) {
    const dbRating = await this.prisma.rating.findUnique({
      where: { id: id },
    });
    if (!dbRating) {
      throw new NotFoundException(`Рейтинг не найден`);
    }
    const scope = rating.scope;
    delete rating.scope;
    if (scope) {
      await this.deleteAndCreateRatingsScope(id, scope);
    }
    this.cronService.deleteInterval(`rating-${id}`);
    if (rating.minuteUpdate) {
      this.cronService.addInterval(
        `rating-${id}`,
        1000 * 60 * rating.minuteUpdate,
        () => this.updateRatingScore(id),
      );
    }
    return this.prisma.rating.update({
      where: { id: id },
      data: rating,
    });
  }

  async deleteRating(id: number) {
    try {
      this.cronService.deleteInterval(`rating-${id}`);
    } catch {}
    const raiting = await this.prisma.rating.findUnique({
      where: { id: id },
    });
    if (!raiting) {
      throw new NotFoundException(`Рейтинг не найден`);
    }

    return this.prisma.rating.delete({
      where: { id: id },
    });
  }
  async deleteAndCreateRatingsScope(
    ratingId: number,
    newScope: IScopeRating[],
  ) {
    await this.prisma.ratingScope.deleteMany({
      where: {
        ratingId: ratingId,
      },
    });
    await this.prisma.ratingScope.createMany({
      data: newScope.map((scope) => ({ ...scope, ratingId: ratingId })),
    });
  }
  async getRatingScore(
    id: number,
    filters: IFilter[] = [],
    page: number,
    limit: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderProps: IOrder,
  ) {
    let whereOptions = { ratingId: id };
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const scoresCount = await this.prisma.score.count({
      where: whereOptions,
    });
    const scores = await this.prisma.score.findMany({
      where: whereOptions,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
            course: true,
            group: true,
            direction: true,
          },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: orderProps,
    });
    whereOptions = { ratingId: id };
    const minMaxScores = await this.prisma.score.aggregate({
      _min: { ratingScore: true },
      _max: { ratingScore: true },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: scoresCount,
        totalPages: Math.ceil(scoresCount / limit),
        minScores: minMaxScores._min.ratingScore,
        maxScores: minMaxScores._max.ratingScore,
      },
      rows: scores,
    };
  }
  async setIntervalsRating() {
    const ratings = await this.prisma.rating.findMany({
      where: { minuteUpdate: { gt: 0 } },
    });
    ratings.forEach((rating) => {
      if (rating.minuteUpdate) {
        this.cronService.addInterval(
          `rating-${rating.id}`,
          1000 * 60 * rating.minuteUpdate,
          () => this.updateRatingScore(rating.id),
        );
      }
    });
  }
  async updateRatingScore(id: number) {
    await this.prisma.score.deleteMany({
      where: { ratingId: id },
    });
    const students = await this.prisma.user.findMany({
      where: { role: { name: 'student' } },
    });
    const success = await this.prisma.success.findMany({
      where: { userId: { in: students.map((student) => student.id) } },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    const allTags = await this.prisma.tag.findMany({
      where: { deletedAt: null },
      include: {
        childTags: true,
        ratingScope: {
          where: {
            ratingId: id,
          },
        },
      },
    });
    const rootTags = allTags.filter((tag) => tag.childTags.length === 0);

    const recurseModify = (tag, sum): number => {
      const child = allTags.find((child) => child.id === tag.baseTagId);
      sum *= child.ratingScope ? child.ratingScope[0].ratingScore : 1;
      if (child.baseTagId) {
        return recurseModify(child, sum);
      }
      return sum;
    };

    const ratingScope: { [key: number]: number } = {};

    rootTags.forEach((tag) => {
      const ratingScore =
        tag.ratingScope.length > 0 ? tag.ratingScope[0].ratingScore : 0;
      ratingScope[tag.id] = tag.baseTagId
        ? recurseModify(tag, ratingScore)
        : ratingScore;
    });

    const scorePromises = students.map(async (student) => {
      const studentSuccess = success.filter(
        (success) => success.userId === student.id,
      );
      const sum = await Promise.all(
        studentSuccess.map(async (success) => {
          const tagRatings = await Promise.all(
            success.tags.map(async (tag) => {
              const score = ratingScope[tag.tagId] || 0;
              return score;
            }),
          );
          return tagRatings.reduce((acc, cur) => acc + cur, 0);
        }),
      );

      const totalSum = sum.reduce((acc, cur) => acc + cur, 0);
      return this.prisma.score.create({
        data: {
          studentId: student.id,
          ratingId: id,
          ratingScore: totalSum,
        },
      });
    });

    await Promise.all(scorePromises);
  }
}
