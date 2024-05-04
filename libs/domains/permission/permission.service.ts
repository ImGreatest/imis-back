import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ICreatePermission } from './interface/create.permission.interface';
import { IUpdatePermission } from './interface/update.permission.interface';
@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}
  logger = new Logger(PermissionService.name);
  async create(permission: ICreatePermission) {
    this.logger.verbose(permission);
    return this.prisma.permission.create({ data: permission });
  }
  async getPage(limit: number, page: number) {
    this.logger.verbose(`limit-${limit} page-${page}`);
    const offset = (page - 1) * limit;
    const pageCount = await this.prisma.permission.count();
    const perms = await this.prisma.permission.findMany({
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
      content: perms,
    };
  }
  async getById(id: number) {
    this.logger.verbose(`getById-${id}`);
    return this.prisma.permission.findUnique({
      where: {
        id: id,
      },
    });
  }
  async update(id: number, permission: IUpdatePermission) {
    this.logger.verbose(`update-${id}`);
    return this.prisma.permission.update({
      where: {
        id: id,
      },
      data: permission,
    });
  }

  async delete(id: number) {
    this.logger.verbose(`delete-${id}`);

    return this.prisma.permission.delete({
      where: {
        id: id,
      },
    });
  }
}
