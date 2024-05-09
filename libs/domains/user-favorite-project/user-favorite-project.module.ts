import { Module } from '@nestjs/common';
import { UserFavoriteProjectService } from './user-favorite-project.service';
import { UserFavoriteProjectRepository } from './repository/user-favorite-project.repository';
import { UserFavoriteProjectAdapter } from '../../adapter/user-favorite-project/user-favorite-project.adapter';

@Module({
  providers: [
    UserFavoriteProjectService,
    {
      provide: UserFavoriteProjectRepository,
      useClass: UserFavoriteProjectAdapter,
    },
  ],
  exports: [UserFavoriteProjectService],
})
export class UserFavoriteProjectModule {}
