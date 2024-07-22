import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EventControllerService } from './event-controller.service';
import { ReqCreateEventDto } from './dto/req-create-event.dto';
import { ResEventDto } from './dto/res-event.dto';
import { ReqUpdateEventDto } from './dto/req-update-event.dto';

@ApiTags('event')
@ApiBearerAuth()
@Controller('event')
export class EventController {
  constructor(private eventService: EventControllerService) {}

  @Post('create-event')
  @ApiBody({ type: ReqCreateEventDto })
  createEvent(@Body() data: ReqCreateEventDto): Promise<void> {
    return this.eventService.createEvent(data);
  }

  @Get('get-event/:id')
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  getEvent(@Param('id') eventId: number): Promise<ResEventDto> {
    return this.eventService.getEvent(eventId);
  }

  @Get('get-events')
  getEvents(): Promise<ResEventDto[]> {
    return this.eventService.getEvents();
  }

  @Post('update-event/:id')
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  @ApiBody({ type: ReqUpdateEventDto })
  updateEvent(
    @Param('id') id: number,
    @Body() data: ReqUpdateEventDto,
  ): Promise<void> {
    return this.eventService.updateEvent(id, data);
  }

  @Delete('delete-event/:id')
  @ApiParam({
    name: 'id',
    required: true,
    example: 1,
  })
  deleteEvent(@Param('id') eventId: number): Promise<void> {
    return this.eventService.deleteEvent(eventId);
  }
}
