import { Injectable } from '@nestjs/common';
import { EventRepository } from './repositories/event.repository';
import { IReqCreateEventDto } from './dto/req-dto/req-create-event.dto';
import { IReqUpdateEventDto } from './dto/req-dto/req-update-event.dto';
import { IResEventDto } from './dto/res-dto/res-event.dto';

@Injectable()
export class EventService {
  constructor(private eventRep: EventRepository) {}

  createEvent(data: IReqCreateEventDto): Promise<void> {
    return this.eventRep.createEvent(data);
  }

  getEvent(eventId: number): Promise<IResEventDto> {
    return this.eventRep.getEvent(eventId);
  }

  getEvents(): Promise<IResEventDto[]> {
    return this.eventRep.getEvents();
  }

  updateEvent(id: number, data: IReqUpdateEventDto): Promise<void> {
    return this.eventRep.updateEvent(id, data);
  }

  deleteEvent(eventId: number): Promise<void> {
    return this.eventRep.deleteEvent(eventId);
  }
}
