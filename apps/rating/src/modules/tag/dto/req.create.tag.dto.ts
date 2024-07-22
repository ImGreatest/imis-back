import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateTag } from 'libs/domains/tag/interface/create.tag.interface';

export class ReqCreateTagDto implements ICreateTag {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  baseTagId?: number;
}
