import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { EStatusEvent } from '../enums/status-event.enum';
import { EventStatus } from '@prisma/client';

export class ReqCreateEventDto {
  @ApiProperty({ example: 'event' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-05-10' })
  @IsDate()
  dateStart: Date;

  @ApiProperty({ example: '2024-05-11' })
  @IsDate()
  dateEnd: Date;

  @ApiProperty({ example: EStatusEvent.planned })
  @IsEnum(EventStatus)
  status: EventStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  createrId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  confidentPersonId: number;
}
