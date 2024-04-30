import { ApiProperty } from '@nestjs/swagger';
import { RatingScoringType } from '@prisma/client';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating.interface';

export class ReqUpdateRatingDto implements IUpdateRating {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  minuteUpdate?: number;
  @ApiProperty({
    example: [
      {
        tagId: 1,
        ratingScore: 4,
      },
    ],
  })
  @IsArray()
  scope?: IScopeRating[];
  @ApiProperty({ example: 'maximum' })
  @IsString()
  scoringType: RatingScoringType;
}
