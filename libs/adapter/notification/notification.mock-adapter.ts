import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "libs/domains/notification/repositories/notification.repository";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { NotifacationStatus } from "@prisma/client";

@Injectable()
export class NotificationMockAdapter extends NotificationRepository {
	constructor() {
		super();
	}

	async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
		throw new Error(`${{ ...data }}`);
	}

	async getCurrent(id: number): Promise<IResNoticeDto> {
		throw new Error(`${id}`);
	}

	async getBySender(id: number, date?: string, visible?: boolean): Promise<IResNoticeDto[]> {
		throw new Error(`${id}, ${date}, ${visible}`);
	}

	async getByRecipient(id: number, date?: string, visible?: boolean): Promise<IResNoticeDto[]> {
		throw new Error(`${id}, ${date}, ${visible}`);
	}

	async getByStatus(status: NotifacationStatus, date?: string, visible?: boolean): Promise<IResNoticeDto[]> {
		throw new Error(`${status}, ${date}, ${visible}`);
	}

	async getByTime(date: string, visible?: boolean): Promise<IResNoticeDto[]> {
		throw new Error(`${date}, ${visible}`);
	}

	async getBySenderAndRecipient(
		senderId:number,
		recipientId:number,
		date:string,
		visible:boolean
	): Promise<IResNoticeDto[]> {
		throw new Error(`${senderId}, ${recipientId}, ${date}, ${visible}`);
	}

	async changeStatus(id: number, status: NotifacationStatus): Promise<void> {
		throw new Error(`${id}, ${status}`);
	}

	async getByVisible(visible: boolean, date?: string): Promise<IResNoticeDto[]> {
		throw new Error(`${visible}, ${date}`);
	}

	async changeVisible(id: number, visible: boolean): Promise<void> {
		throw new Error(`${id}, ${visible}`);
	}

	async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
		throw new Error(`${id}, ${{ ...data }}`);
	}

	async deleteNotice(id: number): Promise<void> {
		throw new Error(`${id}`);
	}
}
