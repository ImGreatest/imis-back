import { Injectable } from '@nestjs/common';
import { IReqCreateUser } from './dto/req-dto/req-create-user.interface.dto';
import { IReqUpdateUser } from './dto/req-dto/req-update-user.interface.dto';
import { IResSuccessUser, IResUser } from './dto/res-dto/res-user.dto';
import { IResGetUserAndCountDto } from './dto/res-dto/res-get-user-and-count.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRep: UserRepository) {}

  async createUser(user: IReqCreateUser): Promise<IResUser> {
    return this.userRep.createUser(user);
  }

  async getUserAndCount(): Promise<IResGetUserAndCountDto> {
    return this.userRep.getUserAndCount();
  }

  async getUserByEmail(email: string): Promise<IResUser> {
    return this.userRep.getUserByEmail(email);
  }
  getStudents(): Promise<IResSuccessUser[]> {
    return this.userRep.getStudents();
  }

  async getUserById(id: number): Promise<IResUser> {
    return this.userRep.getUserById(id);
  }

  async getUsers(): Promise<IResUser[]> {
    return this.userRep.getUsers();
  }

  async getUserRoleId(id: number): Promise<number> {
    return this.userRep.getUserRoleId(id);
  }

  async updateUser(id: number, user: IReqUpdateUser): Promise<IResUser> {
    return this.userRep.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<IResUser> {
    return this.userRep.deleteUser(id);
  }
}
