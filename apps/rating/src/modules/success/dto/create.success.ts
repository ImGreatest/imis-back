import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ICreateSuccess } from 'libs/domains/success/interface/create.success';

export class ReqCreateSuccessDto implements ICreateSuccess {
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
