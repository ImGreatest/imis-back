import { NotifacationStatus } from "@prisma/client";

export interface IReqGetByStatusDto {
	status: NotifacationStatus;
	dateTimeSent?: Date;
	visible?: boolean;
}
