import { Module } from '@nestjs/common';
import { EventModule } from '../../../../../libs/domains/event/event.module';
import { EventControllerService } from './event-controller.service';
import { EventController } from './event.controller';

@Module({
  imports: [EventModule],
  providers: [EventControllerService],
  controllers: [EventController],
})
export class EventControllerModule {}
