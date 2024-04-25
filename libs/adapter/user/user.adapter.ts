import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'libs/domains/user/repositories/user.repository';
import { IReqCreateUser } from 'libs/domains/user/dto/req-dto/req-create-user.interface.dto';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { IResGetUserAndCountDto } from 'libs/domains/user/dto/res-dto/res-get-user-and-count.dto';
import { User } from 'libs/domains/user/entities/user';
import { IReqUpdateUser } from 'libs/domains/user/dto/req-dto/req-update-user.interface.dto';
import { CryptoService } from 'libs/services/crypto/crypto.service';

@Injectable()
export class UserAdapter extends UserRepository {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {
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
      pass: this.cryptoService.getHash(user.pass),
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

    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) throw new NotFoundException('Пользователя с такой почтой нет');

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

  async getUserRoleId(id: number): Promise<number> {
    Logger.verbose('getUserRole');
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error(`User with id = ${id} is not found!`);
    }

    return user.roleId;
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
      pass: this.cryptoService.getHash(user.pass),
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
