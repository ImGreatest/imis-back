import { Injectable } from '@nestjs/common';
import { UserFavoriteEventRepository } from '../../domains/user-favorite-event/repositories/user-favorite-event.repository';
import { IReqSubscribeOnEventDto } from '../../domains/user-favorite-event/dto/req-dto/req-subscribe-on-event.dto';
import { IReqUnsubscribeOnEventDto } from '../../domains/user-favorite-event/dto/req-dto/req-unsubscribe-on-event.dto';
import { IResGetSubscribesDto } from '../../domains/user-favorite-event/dto/res-dto/res-get-subscribes.dto';

@Injectable()
export class UserFavoriteEventMockAdapter extends UserFavoriteEventRepository {
  constructor() {
    super();
  }

  async subEvent(data: IReqSubscribeOnEventDto): Promise<void> {
    throw new Error(`${data}`);
  }

  async getSubsUser(userId: number): Promise<IResGetSubscribesDto[]> {
    throw new Error(`${userId}`);
  }

  async unsubEvent(data: IReqUnsubscribeOnEventDto): Promise<void> {
    throw new Error(`${data}`);
  }
}
