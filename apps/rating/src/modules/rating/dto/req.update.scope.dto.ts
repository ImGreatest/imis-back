import { ApiProperty } from '@nestjs/swagger';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';
import { IsArray } from 'class-validator';

export class ReqUpdateScopeDto {
  @ApiProperty({
    example: [
      {
        tagId: 1,
        ratingScore: 4,
      },
    ],
  })
  @IsArray()
  scope: IScopeRating[];
}
