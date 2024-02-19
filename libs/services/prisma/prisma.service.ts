import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(this.SoftDeleteMiddleware);
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  private SoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (
      ![
        'User',
        'Device',
        'Ingredient',
        'Recipes',
        'Advertisement',
        'AdvertisementContent',
        'Cleaning',
        'Maintenance',
      ].includes(params.model)
    ) {
      return next(params);
    }
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }
    if (params.action === 'deleteMany') {
      return next({
        ...params,
        action: 'updateMany',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }
    if (params.action === 'findMany') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }
    return next(params);
  };
}