import { EventStatus } from "@prisma/client"

export interface IReqCreateEventDto {
	name: string;
	dateStart: Date;
	dateEnd: Date;
	status: EventStatus,
	createrId: number;
	confidentPersonId: number;
}
