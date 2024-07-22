import { ApiProperty } from '@nestjs/swagger';
import { RatingScoringType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICreateRating } from 'libs/domains/rating/interface/create.rating.interface';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';

export class ReqCreateRatingDto implements ICreateRating {
  @ApiProperty({
    type: Array<IScopeRating>,
    example: [{ tagId: 1, ratingScore: 4 }],
  })
  @IsArray()
  scope: IScopeRating[];
  @ApiProperty()
  @IsNumber()
  minuteUpdate: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ example: 'maximum' })
  @IsString()
  scoringType: RatingScoringType;
  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  default?: boolean;
}
