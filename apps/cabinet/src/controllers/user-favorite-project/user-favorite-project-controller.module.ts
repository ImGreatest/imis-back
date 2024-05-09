import { Module } from "@nestjs/common";
import { UserFavoriteProjectControllerService } from "./user-favorite-project-controller.service";
import { UserFavoriteProjectController } from "./user-favorite-project.controller";
import {
	UserFavoriteProjectModule
} from "../../../../../libs/domains/user-favorite-project/user-favorite-project.module";

@Module({
	imports: [UserFavoriteProjectModule],
	providers: [UserFavoriteProjectControllerService],
	controllers: [UserFavoriteProjectController]
})
export class UserFavoriteProjectControllerModule {}
