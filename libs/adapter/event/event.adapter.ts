import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../domains/event/repositories/event.repository';
import { PrismaService } from '../../services/prisma/prisma.service';
import { IReqCreateEventDto } from '../../domains/event/dto/req-dto/req-create-event.dto';
import { IResEventDto } from '../../domains/event/dto/res-dto/res-event.dto';
import { IReqUpdateEventDto } from '../../domains/event/dto/req-dto/req-update-event.dto';

@Injectable()
export class EventAdapter extends EventRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createEvent(data: IReqCreateEventDto): Promise<void> {
    await this.prisma.event.create({
      data: {
        name: data.name,
        dateStart: new Date(data.dateStart),
        dateEnd: new Date(data.dateEnd),
        status: data.status,
        createrId: data.createrId,
        confidentPersonId: data.confidentPersonId,
      },
    });
  }

  async getEvent(eventId: number): Promise<IResEventDto> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
  }

  async getEvents(): Promise<IResEventDto[]> {
    return this.prisma.event.findMany();
  }

  async updateEvent(id: number, data: IReqUpdateEventDto): Promise<void> {
    await this.prisma.event.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        dateStart: new Date(data.dateStart),
        dateEnd: new Date(data.dateEnd),
        status: data.status,
        createrId: data.createrId,
        confidentPersonId: data.confidentPersonId,
      },
    });
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  }
}
