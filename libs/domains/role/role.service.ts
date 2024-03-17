import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRole } from './interface/create.role';
import { IUpdateRole } from './interface/update.role';
@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(role: ICreateRole) {
    return this.prisma.userRole.create({
      data: role,
    });
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.userRole.findMany({
      take: limit,
      skip: offset,
    });
  }
  async getById(id: number) {
    return this.prisma.userRole.findUnique({
      where: { id: id },
    });
  }
  async update(id: number, role: IUpdateRole) {
    return this.prisma.userRole.update({
      where: { id: id },
      data: role,
    });
  }

  async delete(id: number) {
    return this.prisma.userRole.delete({
      where: { id: id },
    });
  }
}
