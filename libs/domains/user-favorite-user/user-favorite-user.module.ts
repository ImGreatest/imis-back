import { Module } from "@nestjs/common";
import { UserFavoriteUserService } from "./user-favorite-user.service";
import { UserFavoriteUserRepository } from "./repository/user-favorite-user.repository";
import { UserFavoriteUserAdapter } from "../../adapter/user-favorite-user/user-favorite-user.adapter";

@Module({
	providers: [
		UserFavoriteUserService,
		{
			provide: UserFavoriteUserRepository,
			useClass: UserFavoriteUserAdapter
		}
	],
	exports: [UserFavoriteUserService]
})
export class UserFavoriteUserModule {}