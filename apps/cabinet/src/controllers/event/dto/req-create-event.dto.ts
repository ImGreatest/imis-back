import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EventStatus } from '@prisma/client';

export class ReqCreateEventDto {
  @ApiProperty({ example: 'event' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-05-10' })
  @IsString()
  dateStart: string;

  @ApiProperty({ example: '2024-05-11' })
  @IsString()
  dateEnd: string;

  @ApiProperty({ example: EventStatus.planned })
  @IsEnum(EventStatus)
  status: EventStatus;

  @ApiProperty({ example: 1 })
  @IsNumber()
  createrId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  confidentPersonId: number;
}
