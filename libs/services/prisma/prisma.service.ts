import {
  ConflictException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(this.softDeleteMiddleware);
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

  private readonly modelToNotCheckConflict = [
    'RatingScope',
    'Score',
    'ProjectSkils',
    'UserSkills',
    'UserProject',
    'UserFavoritProject',
    'Permission',
    'SuccessTags',
    'Notifacation',
  ];

  private softDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    const { model, action, args } = params;

    // Check if model is not included in deletion middleware
    if (
      !['User', 'Company', 'Theme', 'Project', 'Success', 'Tag'].includes(model)
    ) {
      if (
        action === 'create' &&
        !this.modelToNotCheckConflict.includes(model)
      ) {
        let existingObject = null;
        try {
          // Check if object with the same name already exists
          existingObject = await this[model].findUnique({
            where: {
              name: args.data.name,
            },
          });
        } catch (error) {
          console.log(error);
        }
        if (existingObject) {
          throw new ConflictException(`${model} уже существует`);
        }
      }
      return next(params);
    }

    if (action === 'delete' || action === 'deleteMany') {
      // Soft delete by updating deletedAt timestamp
      const updatedAction = action === 'delete' ? 'update' : 'updateMany';
      return next({
        ...params,
        action: updatedAction,
        args: { ...args, data: { deletedAt: new Date() } },
      });
    }

    if (['findUnique', 'findFirst', 'findMany'].includes(action)) {
      // Add condition to filter out soft-deleted records
      return next({
        ...params,
        action: action === 'findMany' ? action : 'findFirst',
        args: { ...args, where: { ...args?.where, deletedAt: null } },
      });
    }

    if (action === 'create') {
      // Check if object with the same properties already exists
      const existingObject = await this[model].findUnique(
        this.argsToFind(params)[model],
      );
      if (existingObject) {
        // Soft delete previous object and update with new one
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
