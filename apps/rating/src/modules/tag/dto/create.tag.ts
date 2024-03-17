import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ICreateTag } from 'libs/domains/tag/interface/create.tag';

export class ReqCreateTagDto implements ICreateTag {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  baseTagId?: number;
}
