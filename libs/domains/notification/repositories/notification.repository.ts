import { Injectable } from "@nestjs/common";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { NotifacationStatus } from "@prisma/client";

@Injectable()
export abstract class NotificationRepository {
	abstract createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto>;

	abstract getCurrent(id: number): Promise<IResNoticeDto>;

	abstract getBySender(id: number, date?: string, visible?: boolean): Promise<IResNoticeDto[]>;

	abstract getByRecipient(id: number, date?: string, visible?: boolean): Promise<IResNoticeDto[]>;

	abstract getByStatus(status: NotifacationStatus, date?: string, visible?: boolean): Promise<IResNoticeDto[]>;

	abstract getByTime(date: string, visible?: boolean): Promise<IResNoticeDto[]>;

	abstract getBySenderAndRecipient(
		senderId: number,
		recipientId: number,
		date: string,
		visible: boolean
	): Promise<IResNoticeDto[]>;

	abstract getByVisible(visible: boolean, date?: string): Promise<IResNoticeDto[]>;

	abstract changeStatus(id: number, status: NotifacationStatus): Promise<void>;

	abstract changeVisible(id: number, visible: boolean): Promise<void>;

	abstract updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void>;

	abstract deleteNotice(id: number): Promise<void>;
}