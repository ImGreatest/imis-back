import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRole } from './interface/create.role';
import { IUpdateRole } from './interface/update.role';
import { IUpdatePermission } from './interface/update.permissions';
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
    const pageCount = await this.prisma.userRole.count();
    const roles = await this.prisma.userRole.findMany({
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
      content: roles,
    };
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

  async createDeletePermissions(
    roleId: number,
    newPermission: IUpdatePermission[],
  ) {
    await this.prisma.permission.deleteMany({
      where: {
        roleId: roleId,
      },
    });
    return this.prisma.permission.createMany({
      data: newPermission.map((perm) => ({ ...perm, roleId: roleId })),
    });
  }
}
