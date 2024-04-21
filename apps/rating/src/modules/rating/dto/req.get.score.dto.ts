import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject } from 'class-validator';
import { IFilter } from 'libs/domains/rating/interface/filter.rating.interface';
import { IOrder } from 'libs/domains/rating/interface/order.rating.interface';

export class ReqGetScoreDto {
  @ApiProperty()
  @IsNumber()
  page: number;
  @ApiProperty()
  @IsNumber()
  pageSize: number;
  @ApiProperty({ example: [{ column: 'scoreRating', value: 5 }] })
  @IsArray()
  filters: IFilter[];

  @ApiProperty({ example: { ratingScore: 'asc' } })
  @IsObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderProps: IOrder;
}
