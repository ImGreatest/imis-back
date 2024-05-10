import { Module } from "@nestjs/common";
import { UserFavoriteEventModule } from "../../../../../libs/domains/user-favorite-event/user-favorite-event.module";
import { UserFavoriteEventControllerService } from "./user-favorite-event-controller.service";
import { UserFavoriteEventController } from "./user-favorite-event.controller";

@Module({
	imports: [UserFavoriteEventModule],
	providers: [UserFavoriteEventControllerService],
	controllers: [UserFavoriteEventController]
})
export class UserFavoriteEventControllerModule {}
