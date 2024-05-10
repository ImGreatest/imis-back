import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventRepository } from './repositories/event.repository';
import { EventAdapter } from '../../adapter/event/event.adapter';

@Module({
  providers: [
    EventService,
    {
      provide: EventRepository,
      useClass: EventAdapter,
    },
  ],
  exports: [EventService],
})
export class EventModule {}
