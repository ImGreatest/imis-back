import { NotifacationStatus } from '@prisma/client'

export interface IReqCreateNoticeDto {
	id: number;
	senderId: number;
	recipientId: number;
	status: NotifacationStatus;
	dateTimeSent: Date;
	visible: boolean;
}
