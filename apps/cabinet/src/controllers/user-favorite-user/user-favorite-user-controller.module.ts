import { Module } from '@nestjs/common';
import { UserFavoriteUserModule } from '../../../../../libs/domains/user-favorite-user/user-favorite-user.module';
import { UserFavoriteUserControllerService } from './user-favorite-user-controller.service';
import { UserFavoriteUserController } from './user-favorite-user.controller';

@Module({
  imports: [UserFavoriteUserModule],
  providers: [UserFavoriteUserControllerService],
  controllers: [UserFavoriteUserController],
})
export class UserFavoriteUserControllerModule {}
