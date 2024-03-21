import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating';
import { IUpdateRating } from './interface/update.rating';
import { IScopeRating } from './interface/scope.rating';
@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async createRating(rating: ICreateRating) {
    return this.prisma.rating.create({
      data: rating,
    });
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
    return this.prisma.rating.update({
      where: { id: id },
      data: rating,
    });
  }

  async deleteRating(id: number) {
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
}
