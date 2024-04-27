import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreateRole } from './interface/create.role.interface';
import { IUpdateRole } from './interface/update.role.interface';
import { IUpdatePermission } from './interface/update.permissions.interface';
import {
  posibleConditions,
  ruActions,
  ruSybjects,
} from 'libs/services/casl/ability.guard';
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
    const pageCount = await this.prisma.userRole.count({
      where: { deleted_at: null },
    });
    const roles = await this.prisma.userRole.findMany({
      take: limit,
      skip: offset,
      where: { deleted_at: null },
      select: {
        id: true,
        name: true,
        Permission: {
          select: {
            action: true,
            subject: true,
            conditions: true,
            inverted: true,
          },
        },
      },
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
  async getRolesAssert() {
    return {
      subjects: ruSybjects,
      actions: ruActions,
      posibleConditions: posibleConditions,
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
