import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ICreateSuccess } from 'libs/domains/success/interface/create.success.interface';

export class ReqCreateSuccessDto implements ICreateSuccess {
  @ApiProperty({ type: Array<number>, example: [1, 2, 3] })
  @IsArray()
  tags: number[];
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
