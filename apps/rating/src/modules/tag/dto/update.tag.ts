import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IUpdateTag } from 'libs/domains/tag/interface/update.tag';

export class ReqUpdateTagDto implements IUpdateTag {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  baseTagId?: number;
}
