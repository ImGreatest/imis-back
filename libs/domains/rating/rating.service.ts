import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRating } from './interface/create.rating';
import { IUpdateRating } from './interface/update.rating';
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
}
