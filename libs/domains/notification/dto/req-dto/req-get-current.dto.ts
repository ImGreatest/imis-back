import { NotifacationStatus } from "@prisma/client";

export interface IReqGetCurrentDto {
	senderId: number;
	recipientId: number;
	status: NotifacationStatus,
	dateTimeSent?: Date;
	visible?: boolean;
}