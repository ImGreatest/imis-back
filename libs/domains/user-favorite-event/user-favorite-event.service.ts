import { Injectable } from '@nestjs/common';
import { IResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';
import { UserFavoriteEventRepository } from './repositories/user-favorite-event.repository';
import { IReqSubscribeOnEventDto } from './dto/req-dto/req-subscribe-on-event.dto';
import { IReqUnsubscribeOnEventDto } from './dto/req-dto/req-unsubscribe-on-event.dto';

@Injectable()
export class UserFavoriteEventService {
  constructor(private userFavoriteEventRep: UserFavoriteEventRepository) {}

  subEvent(data: IReqSubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventRep.subEvent(data);
  }

  getSubsUser(userId: number): Promise<IResGetSubscribesDto[]> {
    return this.userFavoriteEventRep.getSubsUser(userId);
  }

  unsubEvent(data: IReqUnsubscribeOnEventDto): Promise<void> {
    return this.userFavoriteEventRep.unsubEvent(data);
  }
}
