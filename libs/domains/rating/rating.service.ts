import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating';
import { IUpdateRating } from './interface/update.rating';
import { IScopeRating } from './interface/scope.rating';
import { CronService } from 'libs/services/cron/cron.service';
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
    if (rating.hourlyUpdate) {
      this.cronService.addInterval(
        `rating-${createdRating.id}`,
        1000 * 60 * 60 * rating.hourlyUpdate,
        () => this.updateRatingScore(createdRating.id),
      );
    }
    return createdRating;
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.rating.findMany({
      take: limit,
      skip: offset,
    });
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
    if (rating.hourlyUpdate) {
      this.cronService.addInterval(
        `rating-${id}`,
        1000 * 60 * 60 * rating.hourlyUpdate,
        () => this.updateRatingScore(id),
      );
    }
    return this.prisma.rating.update({
      where: { id: id },
      data: rating,
    });
  }

  async deleteRating(id: number) {
    this.cronService.deleteInterval(`rating-${id}`);
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
    this.prisma.ratingScope.createMany({
      data: newScope.map((scope) => ({ ...scope, ratingId: ratingId })),
    });
  }
  async getRatingScore(id: number) {
    return this.prisma.score.findMany({
      where: { ratingId: id },
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
        tags: { include: { tag: { include: { ratingScope: true } } } },
      },
    });
    students.forEach((student) => {
      const studentSuccess = success.filter(
        (success) => success.userId === student.id,
      );
      const sum = studentSuccess.flatMap((success) => {
        return success.tags
          .map(
            (tag) =>
              tag.tag.ratingScope.find((scope) => scope.ratingId === id)
                .ratingScore,
          )
          .reduce((acc, cur) => acc + cur, 0);
      });

      this.prisma.score.create({
        data: {
          studentId: student.id,
          ratingId: id,
          ratingScore: sum.reduce((acc, cur) => acc + cur, 0),
        },
      });
    });
  }
}
