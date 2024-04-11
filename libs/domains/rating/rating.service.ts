import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating.interface';
import { IUpdateRating } from './interface/update.rating.interface';
import { IScopeRating } from './interface/scope.rating.interface';
import { CronService } from 'libs/services/cron/cron.service';
import { IFilter } from './interface/filter.rating.interface';
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

    await this.createDeleteRatigsScope(createdRating.id, scope);
    if (rating.minuteUpdate) {
      this.cronService.addInterval(
        `rating-${createdRating.id}`,
        1000 * 60 * rating.minuteUpdate,
        () => this.updateRatingScore(createdRating.id),
      );
    }
    return createdRating;
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.rating.count();
    const ratings = await this.prisma.rating.findMany({
      take: limit,
      skip: offset,
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      content: ratings,
    };
  }
  async getById(id: number) {
    return this.prisma.rating.findUnique({
      where: { id: id },
    });
  }
  async updateRatingName(id: number, rating: IUpdateRating) {
    const scope = rating.scope;
    delete rating.scope;
    if (scope) {
      await this.createDeleteRatigsScope(id, scope);
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
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return this.prisma.rating.delete({
      where: { id: id },
    });
  }
  async createDeleteRatigsScope(ratingId: number, newScope: IScopeRating[]) {
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
    column: string,
    sortDirection: 'asc' | 'desc',
  ) {
    let whereOptions = { ratingId: id };
    filters.forEach((filter) => {
      whereOptions = { ...whereOptions, [filter.column]: filter.value };
    });
    const orderProps =
      column === 'ratingScore'
        ? { [column]: sortDirection }
        : column === 'group'
          ? { student: { group: { name: sortDirection } } }
          : { student: { [column]: sortDirection } };
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
            tag: {
              include: {
                ratingScope: true,
              },
            },
          },
        },
      },
    });
    const ratingScope = {};

    const scorePromises = students.map(async (student) => {
      const studentSuccess = success.filter(
        (success) => success.userId === student.id,
      );
      const sum = await Promise.all(
        studentSuccess.flatMap(async (success) => {
          const tagRatings = await Promise.all(
            success.tags.map(async (tag) => {
              if (ratingScope[tag.tag.id]) {
                return ratingScope[tag.tag.id];
              }
              if (!tag.tag.baseTagId) {
                ratingScope[tag.tag.id] = tag.tag.ratingScope.find(
                  (scope) => scope.ratingId === id,
                ).ratingScore;
                return ratingScope[tag.tag.id];
              }
              let curId = tag.tag.baseTagId;
              let curSum = tag.tag.ratingScope.find(
                (scope) => scope.ratingId === id,
              ).ratingScore;
              while (curId) {
                const currentTag = await this.prisma.tag.findFirstOrThrow({
                  where: { id: curId },
                  include: { ratingScope: true },
                });
                curSum *= currentTag.ratingScope.find(
                  (scope) => scope.ratingId === id,
                ).ratingScore;
                curId = currentTag.baseTagId;
              }
              ratingScope[tag.tag.id] = curSum;
              return curSum;
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
