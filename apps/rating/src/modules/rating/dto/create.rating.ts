import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating';

export class ReqCreateRatingDto implements ICreateRating {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  createrId: number;
}
