import { EventStatus } from '@prisma/client';

export interface IReqCreateEventDto {
  name: string;
  dateStart: string;
  dateEnd: string;
  status: EventStatus;
  createrId: number;
  confidentPersonId: number;
}
