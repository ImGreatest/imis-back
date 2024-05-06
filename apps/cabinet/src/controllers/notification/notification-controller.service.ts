import { Injectable } from "@nestjs/common";
import { NotificationService } from "libs/domains/notification/notification.service";
import { ReqCreateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-create-notice.dto";
import { ResNoticeDto } from "apps/cabinet/src/controllers/notification/dto/res-dto/res-notice.dto";
import { ReqGetCurrentDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-current.dto";
import { ReqGetBySenderDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-sender.dto";
import { ReqGetByRecipientDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-recipient.dto";
import { ReqGetByStatusDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-status.dto";
import { ReqGetByTimeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-time.dto";
import {
	ReqGetBySenderRecipientDto
} from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { ReqUpdateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-update-notice.dto";
import { ReqDeleteNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-delete-notice.dto";
import { ReqGetByVisibleDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-visible.dto";

@Injectable()
export class NotificationControllerService {
	constructor(private readonly notificationService: NotificationService) {}

	createNotice(data: ReqCreateNoticeDto): Promise<ResNoticeDto> {
		return this.notificationService.createNotice(data);
	}

	getCurrent(data: ReqGetCurrentDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getCurrent(data);
	}

	getBySender(data: ReqGetBySenderDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySender(data);
	}

	getByRecipient(data: ReqGetByRecipientDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByRecipient(data);
	}

	getByStatus(data: ReqGetByStatusDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByStatus(data);
	}

	getByTime(data: ReqGetByTimeDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByTime(data);
	}

	getBySenderAndRecipient(data: ReqGetBySenderRecipientDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySenderAndRecipient(data);
	}

	getByVisible(data: ReqGetByVisibleDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByVisible(data);
	}

	changeVisible(id: number, visible: boolean) {
		return this.notificationService.changeVisible(id, visible);
	}

	updateNotice(id: number, data: ReqUpdateNoticeDto): Promise<void> {
		return this.notificationService.updateNotice(id, data);
	}

	deleteNotice(data: ReqDeleteNoticeDto): Promise<void> {
		return this.notificationService.deleteNotice(data);
	}
}