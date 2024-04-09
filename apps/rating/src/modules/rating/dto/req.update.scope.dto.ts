import { ApiProperty } from '@nestjs/swagger';
import { IScopeRating } from 'libs/domains/rating/interface/scope.rating.interface';

export class ReqUpdateScopeDto {
  @ApiProperty({
    example: [
      {
        tagId: 1,
        ratingScore: 4,
      },
    ],
  })
  scope: IScopeRating[];
}
