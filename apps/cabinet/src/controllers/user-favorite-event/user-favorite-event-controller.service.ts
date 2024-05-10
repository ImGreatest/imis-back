import { Injectable } from '@nestjs/common';
import { UserFavoriteEventService } from '../../../../../libs/domains/user-favorite-event/user-favorite-event.service';
import { ReqSubscribeOnEventDto } from './dto/req-dto/req-subscribe-on-event.dto';
import { ReqUnsubscribeOnEventDto } from './dto/req-dto/req-unsubscribe-on-event.dto';
import { ResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';

@Injectable()
export class UserFavoriteEventControllerService {
  constructor(private userFavoriteEventService: UserFavoriteEventService) {}

  subEvent(data: ReqSubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventService.subEvent(data);
  }

  getSubsUser(userId: number): Promise<ResGetSubscribesDto[]> {
    return this.userFavoriteEventService.getSubsUser(userId);
  }

  unsubEvent(data: ReqUnsubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventService.unsubEvent(data);
  }
}
