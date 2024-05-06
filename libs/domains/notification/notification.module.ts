import { Module } from "@nestjs/common";
import { NotificationService } from "libs/domains/notification/notification.service";
import { NotificationRepository } from "libs/domains/notification/repositories/notification.repository";
import { NotificationAdapter } from "libs/adapter/notification/notification.adapter";

@Module({
	providers: [
		NotificationService,
		{
			provide: NotificationRepository,
			useClass: NotificationAdapter,
		},
	],
	exports: [NotificationService]
})
export class NotificationModule {}
