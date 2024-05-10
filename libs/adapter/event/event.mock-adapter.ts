import { Injectable } from "@nestjs/common";
import { EventRepository } from "../../domains/event/repositories/event.repository";
import { IReqCreateEventDto } from "../../domains/event/dto/req-dto/req-create-event.dto";
import { IResEventDto } from "../../domains/event/dto/res-dto/res-event.dto";
import { IReqUpdateEventDto } from "../../domains/event/dto/req-dto/req-update-event.dto";

@Injectable()
export class EventMockAdapter extends EventRepository {
	constructor() {
		super();
	}

	async createEvent(data: IReqCreateEventDto): Promise<void> {
		throw new Error(`${data}`);
	}

	async getEvent(eventId: number): Promise<IResEventDto> {
		throw new Error(`${eventId}`);
	}

	async getEvents(): Promise<IResEventDto[]> {
		throw new Error();
	}

	async updateEvent(id: number, data: IReqUpdateEventDto): Promise<void> {
		throw new Error(`${id}, ${data}`);
	}

	async deleteEvent(eventId: number): Promise<void> {
		throw new Error(`${eventId}`);
	}
}
