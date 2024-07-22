import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReqSubscribeOnUserDto } from './dto/req-dto/req-subscribe-on-user.dto';
import { UserFavoriteUserControllerService } from './user-favorite-user-controller.service';
import { ReqUnsubscribeOnUserDto } from './dto/req-dto/req-unsubscribe-on-user.dto';
import { ResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';

@ApiTags('user-favorite-user')
@ApiBearerAuth()
@Controller('user-favorite-user')
export class UserFavoriteUserController {
  constructor(
    private userFavoriteUserService: UserFavoriteUserControllerService,
  ) {}

  @Post('subscribe-on-user')
  @ApiBody({ type: ReqSubscribeOnUserDto })
  subUser(@Body() data: ReqSubscribeOnUserDto): Promise<void> {
    return this.userFavoriteUserService.subUser(data);
  }

  @Get('get-subscribes-user/:id')
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  getSubsUser(@Param('id') ownerId: number): Promise<ResGetSubscribesDto[]> {
    return this.userFavoriteUserService.getSubsUser(ownerId);
  }

  @Delete('unsubscribe-on-user')
  @ApiBody({ type: ReqUnsubscribeOnUserDto })
  unsubUser(@Body() data: ReqUnsubscribeOnUserDto): Promise<void> {
    return this.userFavoriteUserService.unsubUser(data);
  }
}
