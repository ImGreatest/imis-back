import { Injectable } from '@nestjs/common';
import { UserFavoriteUserRepository } from './repository/user-favorite-user.repository';
import { IReqSubscribeOnUserDto } from './dto/req-dto/req-subscribe-on-user.dto';
import { IReqUnsubscribeOnUserDto } from './dto/req-dto/req-unsubscribe-on-user.dto';
import { IResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';

@Injectable()
export class UserFavoriteUserService {
  constructor(private favoriteUserRep: UserFavoriteUserRepository) {}

  subUser(data: IReqSubscribeOnUserDto): Promise<void> {
    return this.favoriteUserRep.subUser(data);
  }

  getSubsUser(ownerId: number): Promise<IResGetSubscribesDto[]> {
    return this.favoriteUserRep.getSubsUser(ownerId);
  }

  unsubUser(data: IReqUnsubscribeOnUserDto): Promise<void> {
    return this.favoriteUserRep.unsubUser(data);
  }
}
