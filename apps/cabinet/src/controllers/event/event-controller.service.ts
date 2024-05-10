import { Injectable } from '@nestjs/common';
import { EventService } from '../../../../../libs/domains/event/event.service';
import { ReqCreateEventDto } from './dto/req-create-event.dto';
import { ReqUpdateEventDto } from './dto/req-update-event.dto';
import { ResEventDto } from './dto/res-event.dto';

@Injectable()
export class EventControllerService {
  constructor(private eventService: EventService) {}

  createEvent(data: ReqCreateEventDto): Promise<void> {
    return this.eventService.createEvent(data);
  }

  getEvent(eventId: number): Promise<ResEventDto> {
    return this.eventService.getEvent(eventId);
  }

  getEvents(): Promise<ResEventDto[]> {
    return this.eventService.getEvents();
  }

  updateEvent(id: number, data: ReqUpdateEventDto): Promise<void> {
    return this.eventService.updateEvent(id, data);
  }

  deleteEvent(eventId: number): Promise<void> {
    return this.eventService.deleteEvent(eventId);
  }
}
