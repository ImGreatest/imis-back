import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
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
export class RoleService implements OnApplicationBootstrap {
  constructor(private prisma: PrismaService) {}

  onApplicationBootstrap() {
    this.getPermsToRole();
  }

  private permissionsToRole = {};
  private async getPermsToRole() {
    const roles = await this.prisma.userRole.findMany({
      include: { Permission: true },
    });
    const ret = {};
    roles.forEach((role) => {
      ret[role.id] = {};
      role.Permission.forEach((perm) => {
        if (!ret[role.id][perm.subject]) ret[role.id][perm.subject] = [];
        ret[role.id][perm.subject].push({
          action: perm.action,
          condition: perm.conditions,
        });
      });
    });
    this.permissionsToRole = ret;
  }
  getPermisionsByRoleId(roleId) {
    return this.permissionsToRole[roleId];
  }
  create(role: ICreateRole) {
    return this.prisma.userRole.create({
      data: role,
    });
  }
  async getPage(limit: number, page: number, direction: number, name: string) {
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.userRole.count({
      where: {
        deleted_at: null,
        name: {
          contains: name,
        },
      },
    });
    const roles = await this.prisma.userRole.findMany({
      take: limit,
      skip: offset,
      where: {
        deleted_at: null,
        name: {
          contains: name,
        },
      },
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
      orderBy: {
        name: direction === -1 ? 'asc' : 'desc',
      },
    });
    return {
      info: {
        page: page,
        pageSize: limit,
        totalCount: pageCount,
        totalPages: Math.ceil(pageCount / limit),
      },
      rows: roles,
    };
  }
  getRolesAssert() {
    return {
      subjects: ruSybjects,
      actions: ruActions,
      posibleConditions: posibleConditions,
    };
  }
  getById(id: number) {
    return this.prisma.userRole.findUnique({
      where: { id: id },
    });
  }
  update(id: number, role: IUpdateRole) {
    return this.prisma.userRole.update({
      where: { id: id },
      data: role,
    });
  }

  delete(id: number) {
    return this.prisma.userRole.delete({
      where: { id: id },
    });
  }

  async createDeletePermissions(
    role: string,
    newPermission: IUpdatePermission[],
  ) {
    const roleInstance = await this.prisma.userRole.findFirst({
      where: { name: role },
    });
    if (!roleInstance) {
      throw new NotFoundException(`Роль ${role} не найдена`);
    }

    await this.prisma.permission.deleteMany({
      where: {
        roleId: roleInstance.id,
      },
    });
    const createdPermisions = await this.prisma.permission.createMany({
      data: newPermission.map((perm) => ({ ...perm, roleId: roleInstance.id })),
    });
    this.getPermsToRole();

    return createdPermisions;
  }
}
