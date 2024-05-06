import { Injectable } from "@nestjs/common";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { IReqDeleteNoticeDto } from "libs/domains/notification/dto/req-dto/req-delete-notice.dto";
import { IReqGetNoticeBySenderDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender.dto";
import { IReqGetNoticeByRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-recipient.dto";
import { IReqGetBySenderRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { IReqGetCurrentDto } from "libs/domains/notification/dto/req-dto/req-get-current.dto";
import { IReqGetByStatusDto } from "libs/domains/notification/dto/req-dto/req-get-by-status.dto";
import { IReqGetByTimeDto } from "libs/domains/notification/dto/req-dto/req-get-by-time.dto";
import { IReqGetByVisibleDto } from "libs/domains/notification/dto/req-dto/req-get-by-visible.dto";

@Injectable()
export abstract class NotificationRepository {
	abstract createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto>;

	abstract getCurrent(data: IReqGetCurrentDto): Promise<IResNoticeDto[]>;

	abstract getBySender(data: IReqGetNoticeBySenderDto): Promise<IResNoticeDto[]>;

	abstract getByRecipient(data: IReqGetNoticeByRecipientDto): Promise<IResNoticeDto[]>;

	abstract getByStatus(data: IReqGetByStatusDto): Promise<IResNoticeDto[]>;

	abstract getByTime(data: IReqGetByTimeDto): Promise<IResNoticeDto[]>;

	abstract getBySenderAndRecipient(data: IReqGetBySenderRecipientDto): Promise<IResNoticeDto[]>;

	abstract getByVisible(data: IReqGetByVisibleDto): Promise<IResNoticeDto[]>;

	abstract changeVisible(id: number, visible: boolean): Promise<void>;

	abstract updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void>;

	abstract deleteNotice(data: IReqDeleteNoticeDto): Promise<void>;
}