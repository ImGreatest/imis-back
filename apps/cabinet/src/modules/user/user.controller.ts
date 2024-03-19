import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ReqCreateUserDto} from "./req-dto/req-create-user.dto";
import {UserService} from "./user.service";
import {ApiTags} from "@nestjs/swagger";
import {ResUserDto} from "../../../../../libs/res-dto/res-user.dto";



@ApiTags()
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('get/:userId')
  getUser(@Param('userId') userId: number): Promise<ResUserDto> {
    return this.userService.getUser(userId);
  }

  @Post('create')
  createUser(@Body() data: ReqCreateUserDto) {
    return this.userService.createUser(data);
  }

  // @Patch('update/:userId')
  // updateUser(
  //   @Param('userId') userId: string,
  //   @Body() data: ReqUpdateUserDto,
  // ): Promise<ResUserDto> {
  //   return this.userService.updateUser(userId, data);
  // }

  @Delete('remove/:userId')
  removeUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.removeUser(userId);
  }
}
