import { Injectable } from '@nestjs/common';
import { IReqCreateUser } from 'libs/domains/user/dto/req-dto/req-create-user.dto';
import { IResUser } from '../dto/res-dto/res-user.dto';
import { IReqUpdateUser } from 'libs/domains/user/dto/req-dto/req-update-user.dto';
import { IResGetUserAndCountDto } from '../dto/res-dto/res-get-user-and-count.dto';

@Injectable()
export abstract class UserRepository {
  abstract createUser(user: IReqCreateUser): Promise<IResUser>;

  abstract getUserAndCount(): Promise<IResGetUserAndCountDto>;

  abstract getUserByEmail(email: string): Promise<IResUser>;

  abstract getUserById(id: number): Promise<IResUser>;

  abstract getUserRoleId(id: number): Promise<number>;

  abstract getUsers(): Promise<IResUser[]>;

  abstract updateUser(id: number, user: IReqUpdateUser): Promise<IResUser>;

  abstract deleteUser(id: number): Promise<IResUser>;
}
