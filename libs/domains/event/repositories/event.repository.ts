import { Injectable } from '@nestjs/common';
import { IReqCreateEventDto } from '../dto/req-dto/req-create-event.dto';
import { IResEventDto } from '../dto/res-dto/res-event.dto';
import { IReqUpdateEventDto } from '../dto/req-dto/req-update-event.dto';

@Injectable()
export abstract class EventRepository {
  abstract createEvent(data: IReqCreateEventDto): Promise<void>;

  abstract getEvent(eventId: number): Promise<IResEventDto>;

  abstract getEvents(): Promise<IResEventDto[]>;

  abstract updateEvent(id: number, data: IReqUpdateEventDto): Promise<void>;

  abstract deleteEvent(eventId: number): Promise<void>;
}
