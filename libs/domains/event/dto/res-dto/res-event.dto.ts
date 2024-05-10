import { EStatusEvent } from "../../enums/status-event.enum";

export interface IResEventDto {
	id: number;
	name: string;
	dateStart: Date,
	dateEnd: Date,
	status: EStatusEvent,
	createrId: number;
	confidentPersonId: number;
}
