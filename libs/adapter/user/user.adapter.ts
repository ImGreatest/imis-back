import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'libs/domains/user/repositories/user.repository';
import { IReqCreateUser } from 'libs/domains/user/dto/req-dto/req-create-user.interface.dto';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { IResGetUserAndCountDto } from 'libs/domains/user/dto/res-dto/res-get-user-and-count.dto';
import { User } from 'libs/domains/user/entities/user';
import { IReqUpdateUser } from 'libs/domains/user/dto/req-dto/req-update-user.interface.dto';

@Injectable()
export class UserAdapter extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createUser(user: IReqCreateUser): Promise<IResUser> {
    Logger.verbose('createUser', user);

    const userData = {
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: {
        connect: {
          id: user.roleId,
        },
      },
      pass: user.pass,
      course: user.course,
      direction: {
        connect: {
          id: user.direction,
        },
      },
      group: {
        connect: {
          id: user.group,
        },
      },
    };

    Logger.verbose('createUser - userData', userData);

    return this.prisma.user.create({
      data: userData,
    });
  }

  async getUserAndCount(): Promise<IResGetUserAndCountDto> {
    Logger.verbose('getUserAndCount');
    const users: User[] = await this.prisma.user.findMany();
    const totalCount: number = await this.prisma.user.count();

    Logger.verbose('getUserAndCount', users, totalCount);

    if (!users) throw new Error();

    Logger.verbose('getUserAndCount', users, totalCount);

    return {
      rows: users,
      count: totalCount,
    };
  }

  async getUserByEmail(email: string): Promise<IResUser> {
    Logger.verbose('getUserByEmail', email);

    const user = this.prisma.user.findFirst({
      where: { email: email },
    });

    Logger.verbose('getUserByEmail', user);

    if (!user) throw new Error();

    Logger.verbose('getUserByEmail', user);

    return user;
  }

  async getUserById(id: number): Promise<IResUser> {
    Logger.verbose('getUserById', id);
    const user = this.prisma.user.findFirst({
      where: { id: id },
    });

    Logger.verbose('getUserById', user);

    if (!user) throw new Error();

    Logger.verbose('getUserById', user);

    return user;
  }

  async getUsers(): Promise<IResUser[]> {
    Logger.verbose('getUsers');
    const users = this.prisma.user.findMany({
      where: { deletedAt: null },
    });

    Logger.verbose('getUserById', users);

    if (!users) throw new Error();

    Logger.verbose('getUserById', users);

    return users;
  }

  async updateUser(id: number, user: IReqUpdateUser): Promise<IResUser> {
    Logger.verbose('updateUser', id, user);

    const userData = {
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: {
        connect: {
          id: user.roleId,
        },
      },
      pass: user.pass,
      course: user.course,
      direction: {
        connect: {
          id: user.direction,
        },
      },
      group: {
        connect: {
          id: user.group,
        },
      },
    };

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
    });
  }

  async deleteUser(id: number): Promise<IResUser> {
    Logger.verbose('deleteUser', id);

    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
