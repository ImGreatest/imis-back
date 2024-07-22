import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ResEventDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  dateStart: Date;

  @ApiProperty()
  @IsDate()
  dateEnd: Date;

  @ApiProperty()
  @IsNumber()
  createrId: number;

  @ApiProperty()
  @IsNumber()
  confidentPersonId: number;
}
