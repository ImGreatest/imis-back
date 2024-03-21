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

  private readonly argsToFind = (requestData) => ({
    User: { where: { email: requestData.args.data?.email } },
    Company: { where: { name: requestData.args.data?.name } },
    Theme: { where: { name: requestData.args.data?.name } },
    Project: { where: { name: requestData.args.data?.name } },
    Skills: { where: { name: requestData.args.data?.name } },
    Success: { where: { name: requestData.args.data?.name } },
    Tag: { where: { name: requestData.args.data?.name } },
  });

  private SoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    const { model, action, args } = params;
    if (
      ![
        'User',
        'Company',
        'Theme',
        'Project',
        'Skills',
        'Success',
        'Tag',
      ].includes(model)
    ) {
      return next(params);
    }

    if (action === 'delete' || action === 'deleteMany') {
      const updatedAction = action === 'delete' ? 'update' : 'updateMany';
      return next({
        ...params,
        action: updatedAction,
        args: { ...args, data: { deletedAt: new Date() } },
      });
    }

    if (
      action === 'findUnique' ||
      action === 'findFirst' ||
      action === 'findMany'
    ) {
      return next({
        ...params,
        action: action === 'findMany' ? action : 'findFirst',
        args: { ...args, where: { ...args?.where, deletedAt: null } },
      });
    }

    if (action === 'create') {
      console.log(args);
      const existingObject = await this[model].findUnique(
        this.argsToFind(params)[model],
      );
      if (existingObject) {
        return next({
          ...params,
          action: 'update',
          args: {
            ...args,
            data: { deletedAt: null },
            where: { id: existingObject.id },
          },
        });
      }
    }

    return next(params);
  };
}
