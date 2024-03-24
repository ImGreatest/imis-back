import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyRequest } from 'fastify';

import { map, size } from 'lodash';

import {
  RequiredRule,
  CHECK_ABILITY,
} from 'libs/decorators/abilities.decorator';

import {
  subject,
  RawRuleOf,
  MongoAbility,
  ForcedSubject,
  ForbiddenError,
  createMongoAbility,
} from '@casl/ability';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserPayload } from './user-payload.interface';

export const actions = [
  'read',
  'manage',
  'create',
  'update',
  'updateStatus',
  'delete',
] as const;

export const subjects = [
  'UserRole',
  'User',
  'Permission',
  'Company',
  'Theme',
  'Project',
  'Skills',
  'Success',
  'Tag',
  'all',
] as const;

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export type AppAbility = MongoAbility<Abilities>;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  createAbility = (rules: RawRuleOf<AppAbility>[]) =>
    createMongoAbility<AppAbility>(rules);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const currentUser: IUserPayload = context.switchToHttp().getRequest().user;
    const request: FastifyRequest = context.switchToHttp().getRequest();

    const userPermissions = await this.prisma.permission.findMany({
      where: {
        roleId: currentUser.role,
        deleted_at: null,
      },
    });
    const parsedUserPermissions = this.parseCondition(
      userPermissions,
      currentUser,
    );

    try {
      const ability = this.createAbility(Object(parsedUserPermissions));
      for await (const rule of rules) {
        let sub = {};
        const thisPermissions = parsedUserPermissions.find(
          (permission) =>
            permission.action === rule.action &&
            permission.subject === rule.subject,
        );
        if (thisPermissions && size(thisPermissions.conditions)) {
          const subId = +request.params['id'];
          sub = await this.getSubjectById(subId, rule.subject);
        }

        ForbiddenError.from(ability)
          .setMessage('You are not allowed to perform this action')
          .throwUnlessCan(rule.action, subject(rule.subject, sub));
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseCondition(permissions: any[], currentUser: IUserPayload) {
    const data = map(permissions, (permission) => {
      if (size(permission.conditions)) {
        const cond = {};
        const conditionsToParse = ['id', 'spokesPersonId', 'createrId'];

        for (const conditionKey of conditionsToParse) {
          if (permission.conditions[conditionKey]) {
            cond[conditionKey] = +currentUser.role; // Convert parsed value to number
            break; // Stop iteration if a condition is found
          }
        }

        return {
          ...permission,
          conditions: cond,
        };
      }
      return permission;
    });
    return data;
  }

  async getSubjectById(id: number, subName: string) {
    const subject = await this.prisma[subName].findUnique({
      where: {
        id,
      },
    });
    if (!subject) throw new NotFoundException(`${subName} not found`);
    return subject;
  }
}
