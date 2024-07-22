import { UserFavoriteEventControllerService } from './user-favorite-event-controller.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReqSubscribeOnEventDto } from './dto/req-dto/req-subscribe-on-event.dto';
import { ResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';
import { ReqUnsubscribeOnEventDto } from './dto/req-dto/req-unsubscribe-on-event.dto';

@ApiTags('user-favorite-event')
@ApiBearerAuth()
@Controller('user-favorite-event')
export class UserFavoriteEventController {
  constructor(
    private userFavoriteEventService: UserFavoriteEventControllerService,
  ) {}

  @Post('subscribe-on-event')
  @ApiBody({ type: ReqSubscribeOnEventDto })
  subEvent(@Body() data: ReqSubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventService.subEvent(data);
  }

  @Get('get-subscribes-user/:id')
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  getSubsUser(@Param('id') userId: number): Promise<ResGetSubscribesDto[]> {
    return this.userFavoriteEventService.getSubsUser(userId);
  }

  @Delete('unsubscribe-on-event')
  @ApiBody({ type: ReqSubscribeOnEventDto })
  unsubEvent(@Body() data: ReqUnsubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventService.unsubEvent(data);
  }
}
