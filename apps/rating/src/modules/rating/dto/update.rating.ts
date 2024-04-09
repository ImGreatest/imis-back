import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUpdateRating } from 'libs/domains/rating/interface/update.rating';

export class ReqUpdateRatingDto implements IUpdateRating {
  @ApiProperty()
  @IsString()
  name: string;
}
