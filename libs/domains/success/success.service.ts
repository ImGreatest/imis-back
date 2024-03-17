import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateSuccess } from './interface/create.success';
import { IUpdateSuccess } from './interface/update.success';
@Injectable()
export class SuccessService {
  constructor(private prisma: PrismaService) {}

  async create(success: ICreateSuccess) {
    return this.prisma.success.create({
      data: success,
    });
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.success.findMany({
      take: limit,
      skip: offset,
    });
  }
  async getById(id: number) {
    return this.prisma.success.findUnique({
      where: { id: id },
    });
  }
  async update(id: number, success: IUpdateSuccess) {
    return this.prisma.success.update({
      where: { id: id },
      data: success,
    });
  }

  async delete(id: number) {
    return this.prisma.success.delete({
      where: { id: id },
    });
  }
}
