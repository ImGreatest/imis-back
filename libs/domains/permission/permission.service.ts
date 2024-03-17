import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreatePermission } from './interface/create.permission';
import { IUpdatePermission } from './interface/update.permission';
@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(permission: ICreatePermission) {
    return this.prisma.permission.create({
      data: permission,
    });
  }
  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.permission.findMany({
      take: limit,
      skip: offset,
    });
  }
  async getById(id: number) {
    return this.prisma.permission.findUnique({
      where: { id: id },
    });
  }
  async update(id: number, permission: IUpdatePermission) {
    return this.prisma.permission.update({
      where: { id: id },
      data: permission,
    });
  }

  async delete(id: number) {
    return this.prisma.permission.delete({
      where: { id: id },
    });
  }
}
