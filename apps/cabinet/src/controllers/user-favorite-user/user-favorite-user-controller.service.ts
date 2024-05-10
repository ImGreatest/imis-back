import { Injectable } from '@nestjs/common';
import { UserFavoriteUserService } from '../../../../../libs/domains/user-favorite-user/user-favorite-user.service';
import { ReqSubscribeOnUserDto } from './dto/req-dto/req-subscribe-on-user.dto';
import { ReqUnsubscribeOnUserDto } from './dto/req-dto/req-unsubscribe-on-user.dto';
import { ResGetSubscribesDto } from './dto/res-dto/res-get-subscribes.dto';

@Injectable()
export class UserFavoriteUserControllerService {
  constructor(private userFavoriteUserService: UserFavoriteUserService) {}

  subUser(data: ReqSubscribeOnUserDto): Promise<void> {
    return this.userFavoriteUserService.subUser(data);
  }

  getSubsUser(ownerId: number): Promise<ResGetSubscribesDto[]> {
    return this.userFavoriteUserService.getSubsUser(ownerId);
  }

  unsubUser(data: ReqUnsubscribeOnUserDto): Promise<void> {
    return this.userFavoriteUserService.unsubUser(data);
  }
}
