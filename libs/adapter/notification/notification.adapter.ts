import { Injectable, Logger } from "@nestjs/common";
import { NotificationRepository } from "libs/domains/notification/repositories/notification.repository";
import { IReqCreateNoticeDto } from "libs/domains/notification/dto/req-dto/req-create-notice.dto";
import { PrismaService } from "libs/services/prisma/prisma.service";
import { IReqUpdateNoticeDto } from "libs/domains/notification/dto/req-dto/req-update-notice.dto";
import { IReqDeleteNoticeDto } from "libs/domains/notification/dto/req-dto/req-delete-notice.dto";
import { IReqGetCurrentDto } from "libs/domains/notification/dto/req-dto/req-get-current.dto";
import { IResNoticeDto } from "libs/domains/notification/dto/res-dto/res-notice.dto";
import { IReqGetNoticeBySenderDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender.dto";
import { IReqGetNoticeByRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-recipient.dto";
import { IReqGetByStatusDto } from "libs/domains/notification/dto/req-dto/req-get-by-status.dto";
import { IReqGetByTimeDto } from "libs/domains/notification/dto/req-dto/req-get-by-time.dto";
import { IReqGetBySenderRecipientDto } from "libs/domains/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { IReqGetByVisibleDto } from "libs/domains/notification/dto/req-dto/req-get-by-visible.dto";

@Injectable()
export class NotificationAdapter extends NotificationRepository {
	constructor(private prisma: PrismaService) {
		super();
	}

	async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
		Logger.verbose("createNotice", { ...data });

		return this.prisma.notifacation.create({
			data: {
				senderId: data.senderId,
				recipientId: data.recipientId,
				status: data.status,
				dateTimeSent: data.dateTimeSent,
				visible: data.visible,
			},
		});
	}

	async getCurrent(data: IReqGetCurrentDto): Promise<IResNoticeDto[]>  {
		Logger.verbose("getCurrent", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				senderId: data.senderId,
				recipientId: data.recipientId,
				status: data.status,
				dateTimeSent: data?.dateTimeSent,
				visible: data?.visible
			}
		})
	}

	async getBySender(data: IReqGetNoticeBySenderDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getBySender", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				senderId: data.senderId,
				dateTimeSent: data?.dateTimeSent,
				visible: data?.visible,
			}
		});
	}

	async getByRecipient(data: IReqGetNoticeByRecipientDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getByRecipient", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				recipientId: data.recipientId,
				dateTimeSent: data?.dateTimeSent,
				visible: data?.visible,
			}
		});
	}

	async getByStatus(data: IReqGetByStatusDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getByStatus", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				status: data.status,
				dateTimeSent: data?.dateTimeSent,
				visible: data?.visible,
			}
		});
	}

	async getByTime(data: IReqGetByTimeDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getByTime", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				dateTimeSent: data.dateTimeSent,
				visible: data?.visible
			}
		});
	}

	async getBySenderAndRecipient(data: IReqGetBySenderRecipientDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getBySenderAndRecipient", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				senderId: data.senderId,
				recipientId: data.recipientId,
				dateTimeSent: data?.dateTimeSent,
				visible: data?.visible,
			}
		});
	}

	async getByVisible(data: IReqGetByVisibleDto): Promise<IResNoticeDto[]> {
		Logger.verbose("getByVisible", { ...data });

		return this.prisma.notifacation.findMany({
			where: {
				visible: data.visible,
				dateTimeSent: data.dateTimeSent,
			}
		});
	}

	async changeVisible(id: number, visible: boolean): Promise<void> {
		Logger.verbose("changeVisible", id, visible);
		const notice: IResNoticeDto = await this.prisma.notifacation.findUnique({
			where: {
				id: id,
			}
		});

		if (!notice) {
			throw new Error('Notice not found');
		}

		Logger.verbose("changeVisible - notice", { ...notice });

		this.prisma.notifacation.update({
			where: {
				id: id,
			},
			data: {
				senderId: notice.senderId,
				recipientId: notice.recipientId,
				status: notice.status,
				dateTimeSent: notice.dateTimeSent,
				visible: visible,
			}
		});
	}

	async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
		Logger.verbose("updateNotice", id, { ...data });

		this.prisma.notifacation.update({
			where: {
				id: id,
			},
			data: {
				senderId: data.senderId,
				recipientId: data.recipientId,
				status: data.status,
				dateTimeSent: data.dateTimeSent,
				visible: data.visible
			}
		});
	}

	async deleteNotice(data: IReqDeleteNoticeDto): Promise<void> {
		Logger.verbose("deleteNotice", { ...data });

		this.prisma.notifacation.delete({
			where: {
				id: data.id,
			}
		});
	}
}
