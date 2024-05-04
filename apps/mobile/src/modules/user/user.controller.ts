import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'libs/decorators/public.decorator';
import { UsersService } from './user-controller.service';
import { IReqUpdateUser } from 'libs/domains/user/dto/req-dto/req-update-user.interface.dto';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('updateUser')
  updateUser(@Param('id') id: number, @Body() user: IReqUpdateUser): Promise<IResUser> {
    return this.usersService.updateUser(id, user);
  }
}
