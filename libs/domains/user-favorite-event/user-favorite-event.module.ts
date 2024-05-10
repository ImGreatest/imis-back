import { Module } from '@nestjs/common';
import { UserFavoriteEventService } from './user-favorite-event.service';
import { UserFavoriteEventRepository } from './repositories/user-favorite-event.repository';
import { UserFavoriteEventAdapter } from '../../adapter/user-favorite-event/user-favorite-event.adapter';

@Module({
  providers: [
    UserFavoriteEventService,
    {
      provide: UserFavoriteEventRepository,
      useClass: UserFavoriteEventAdapter,
    },
  ],
  exports: [UserFavoriteEventService],
})
export class UserFavoriteEventModule {}
