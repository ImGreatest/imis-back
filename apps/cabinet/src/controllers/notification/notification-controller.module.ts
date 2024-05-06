import { Module } from "@nestjs/common";
import { NotificationModule } from "libs/domains/notification/notification.module";
import { NotificationController } from "apps/cabinet/src/controllers/notification/notification.controller";
import {
	NotificationControllerService
} from "apps/cabinet/src/controllers/notification/notification-controller.service";

@Module({
	imports: [NotificationModule],
	providers: [NotificationControllerService],
	controllers: [NotificationController]
})
export class NotificationControllerModule {}
