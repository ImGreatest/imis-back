import { Injectable } from '@nestjs/common';
import { UserService } from 'libs/domains/user/user.service';
import { ReqCreateUserDto } from './dto/req-create-user.dto';
import { ResUserDto } from './dto/res-user.dto';
import { ResGetUserAndCountDto } from './dto/res-get-user-and-count.dto';
import { ReqUpdateUserDto } from './dto/req-update-user.dto';

@Injectable()
export class UserControllerService {
  constructor(private readonly userService: UserService) {}

  createUser(user: ReqCreateUserDto): Promise<ResUserDto> {
    return this.userService.createUser(user);
  }

  getUserAndCount(): Promise<ResGetUserAndCountDto> {
    return this.userService.getUserAndCount();
  }

  getUserByEmail(email: string): Promise<ResUserDto> {
    return this.userService.getUserByEmail(email);
  }

  getUserById(id: number): Promise<ResUserDto> {
    return this.userService.getUserById(id);
  }

  getUserRoleId(id: number): Promise<number> {
    return this.userService.getUserRoleId(id);
  }

  getUsers(): Promise<ResUserDto[]> {
    return this.userService.getUsers();
  }

  updateUser(id: number, user: ReqUpdateUserDto): Promise<ResUserDto> {
    return this.userService.updateUser(id, user);
  }

  deleteUser(id: number): Promise<ResUserDto> {
    return this.userService.deleteUser(id);
  }
}
