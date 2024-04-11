import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating.interface';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';

export class ReqCreateRatingDto implements ICreateRating {
  @ApiProperty({
    type: Array<IScopeRating>,
    example: [{ tagId: 1, ratingScore: 4 }],
  })
  scope: IScopeRating[];
  @ApiProperty()
  @IsNumber()
  minuteUpdate: number;
  @ApiProperty()
  @IsString()
  name: string;
}
