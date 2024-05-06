import { Injectable } from "@nestjs/common";
import { NotificationService } from "libs/domains/notification/notification.service";
import { ReqCreateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-create-notice.dto";
import { ResNoticeDto } from "apps/cabinet/src/controllers/notification/dto/res-dto/res-notice.dto";
import { ReqUpdateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-update-notice.dto";
import { NotifacationStatus } from "@prisma/client";

@Injectable()
export class NotificationControllerService {
	constructor(private readonly notificationService: NotificationService) {}

	createNotice(data: ReqCreateNoticeDto): Promise<ResNoticeDto> {
		return this.notificationService.createNotice(data);
	}

	getCurrent(id: number): Promise<ResNoticeDto> {
		return this.notificationService.getCurrent(id);
	}

	getBySender(id: number, date?: string, visible?: boolean): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySender(id, date, visible);
	}

	getByRecipient(id: number, date?: string, visible?: boolean): Promise<ResNoticeDto[]> {
		return this.notificationService.getByRecipient(id, date, visible);
	}

	getByStatus(status: NotifacationStatus, date?: string, visible?: boolean): Promise<ResNoticeDto[]> {
		return this.notificationService.getByStatus(status, date, visible);
	}

	getByTime(date: string, visible: boolean): Promise<ResNoticeDto[]> {
		return this.notificationService.getByTime(date, visible);
	}

	getBySenderAndRecipient(
		senderId: number,
		recipientId: number,
		date: string,
		visible: boolean
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySenderAndRecipient(senderId, recipientId, date, visible);
	}

	getByVisible(visible: boolean, date?: string): Promise<ResNoticeDto[]> {
		return this.notificationService.getByVisible(visible, date);
	}

	changeStatus(id: number, status: NotifacationStatus): Promise<void> {
		return this.notificationService.changeStatus(id, status);
	}

	changeVisible(id: number, visible: boolean): Promise<void> {
		return this.notificationService.changeVisible(id, visible);
	}

	updateNotice(id: number, data: ReqUpdateNoticeDto): Promise<void> {
		return this.notificationService.updateNotice(id, data);
	}

	deleteNotice(id: number): Promise<void> {
		return this.notificationService.deleteNotice(id);
	}
}