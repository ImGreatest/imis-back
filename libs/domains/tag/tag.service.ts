import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateTag } from './interface/create.tag';
import { IUpdateTag } from './interface/update.tag';
@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(tag: ICreateTag) {
    return this.prisma.tag.create({
      data: tag,
    });
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.tag.findMany({
      take: limit,
      skip: offset,
    });
  }
  async getById(id: number) {
    return this.prisma.tag.findUnique({
      where: { id: id },
    });
  }
  async update(id: number, tag: IUpdateTag) {
    return this.prisma.tag.update({
      where: { id: id },
      data: tag,
    });
  }

  async delete(id: number) {
    return this.prisma.tag.delete({
      where: { id: id },
    });
  }
}
