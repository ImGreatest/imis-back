import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "libs/domains/notification/repositories/notification.repository";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { IReqGetCurrentDto } from "libs/domains/notification/dto/req-dto/req-get-current.dto";
import { IReqGetNoticeBySenderDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender.dto";
import { IReqGetNoticeByRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-recipient.dto";
import { IReqGetByStatusDto } from "libs/domains/notification/dto/req-dto/req-get-by-status.dto";
import { IReqGetByTimeDto } from "libs/domains/notification/dto/req-dto/req-get-by-time.dto";
import { IReqGetBySenderRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { IReqDeleteNoticeDto } from "libs/domains/notification/dto/req-dto/req-delete-notice.dto";
import { IReqGetByVisibleDto } from "libs/domains/notification/dto/req-dto/req-get-by-visible.dto";

@Injectable()
export class NotificationMockAdapter extends NotificationRepository {
	constructor() {
		super();
	}

	async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
		throw new Error(`${data}`);
	}

	async getCurrent(data: IReqGetCurrentDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getBySender(data: IReqGetNoticeBySenderDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getByRecipient(data: IReqGetNoticeByRecipientDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getByStatus(data: IReqGetByStatusDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getByTime(data: IReqGetByTimeDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getBySenderAndRecipient(data: IReqGetBySenderRecipientDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async getByVisible(data: IReqGetByVisibleDto): Promise<IResNoticeDto[]> {
		throw new Error(`${data}`);
	}

	async changeVisible(id: number, visible: boolean): Promise<void> {
		throw new Error(`${id}, ${visible}`);
	}

	async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
		throw new Error(`${id}, ${data}`);
	}

	async deleteNotice(data: IReqDeleteNoticeDto): Promise<void> {
		throw new Error(`${data}`);
	}
}
