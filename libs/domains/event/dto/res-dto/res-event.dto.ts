import { EventStatus } from "@prisma/client";

export interface IResEventDto {
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  status: EventStatus;
  createrId: number;
  confidentPersonId: number;
}
