import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "libs/domains/notification/repositories/notification.repository";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqGetCurrentDto } from "libs/domains/notification/dto/req-dto/req-get-current.dto";
import { IReqGetNoticeByRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-recipient.dto";
import { IReqGetNoticeBySenderDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender.dto";
import { IReqGetByStatusDto } from "libs/domains/notification/dto/req-dto/req-get-by-status.dto";
import { IReqGetByTimeDto } from "libs/domains/notification/dto/req-dto/req-get-by-time.dto";
import { IReqGetBySenderRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { IReqDeleteNoticeDto } from "libs/domains/notification/dto/req-dto/req-delete-notice.dto";
import { IReqGetByVisibleDto } from "libs/domains/notification/dto/req-dto/req-get-by-visible.dto";

@Injectable()
export class NotificationService {
	constructor(private readonly notificationRep: NotificationRepository) {}

	async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
		return this.notificationRep.createNotice(data);
	}

	async getCurrent(data: IReqGetCurrentDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getCurrent(data);
	}

	async getBySender(data: IReqGetNoticeBySenderDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getBySender(data);
	}

	async getByRecipient(data: IReqGetNoticeByRecipientDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getByRecipient(data);
	}

	async getByStatus(data: IReqGetByStatusDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getByStatus(data);
	}

	async getByTime(data: IReqGetByTimeDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getByTime(data);
	}

	async getBySenderAndRecipient(data: IReqGetBySenderRecipientDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getBySenderAndRecipient(data);
	}

	async getByVisible(data: IReqGetByVisibleDto): Promise<IResNoticeDto[]> {
		return this.notificationRep.getByVisible(data);
	}

	async changeVisible(id: number, visible: boolean): Promise<void> {
		return this.notificationRep.changeVisible(id, visible);
	}

	async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
		return this.notificationRep.updateNotice(id, data);
	}

	async deleteNotice(data: IReqDeleteNoticeDto): Promise<void> {
		return this.notificationRep.deleteNotice(data);
	}
}
