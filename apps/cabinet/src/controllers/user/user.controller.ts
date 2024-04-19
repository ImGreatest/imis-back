import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { UserControllerService } from "./user-controller.service";
import { ResUserDto } from "./dto/res-user.dto";
import { ReqUpdateUserDto } from "./dto/req-update-user.dto";
import { ReqCreateUserDto } from "./dto/req-create-user.dto";
import { ResGetUserAndCountDto } from "./dto/res-get-user-and-count.dto";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserControllerService) {}

  @Post('create-user')
  createUser(
    @Body() user: ReqCreateUserDto
  ): Promise<ResUserDto> {
    return this.userService.createUser(user);
  }

  @Get('get-users-and-count')
  getUserAndCount(): Promise<ResGetUserAndCountDto> {
    return this.userService.getUserAndCount();
  }

  @Get('get-user-by-email:/email')
  getUserByEmail(
    @Param('email') email: string
  ): Promise<ResUserDto> {
    return this.userService.getUserByEmail(email);
  }

  @Get('get-user-by-id/:id')
  getUserById(
    @Param('id') id: number
  ): Promise<ResUserDto> {
    return this.userService.getUserById(id);
  }

  @Get('get-users')
  getUsers(): Promise<ResUserDto[] | null> {
    return this.userService.getUsers();
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: ReqUpdateUserDto,
  ): Promise<ResUserDto> {
    return this.userService.updateUser(id, user);
  }

  @Delete('remove/:id')
  async deleteUser(
    @Param('id') id: number
  ): Promise<ResUserDto> {
    return this.userService.deleteUser(id);
  }
}