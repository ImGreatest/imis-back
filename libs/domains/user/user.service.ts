import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './user.interface';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findAndCount() {
    const users = await this.prisma.user.findMany();
    const totalCount = await this.prisma.user.count();

    const resListDto = {
      rows: users,
      count: totalCount,
    };

    return resListDto;
  }

  async findOneByEmail(mail: string) {
    return this.prisma.user.findFirst({ where: { email: mail } });
  }
  async findOneById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }
  async updateUser(id: number, user: User) {
    return await this.prisma.user.update({
      where: { id: id },
      data: user,
    });
  }
}
