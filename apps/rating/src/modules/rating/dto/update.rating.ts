import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating';

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
  scope?: IScopeRating[];
}
