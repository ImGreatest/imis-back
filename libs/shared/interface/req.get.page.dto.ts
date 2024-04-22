import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject } from 'class-validator';
import { IFilter } from 'libs/shared/interface/filter.interface';
import { IOrder } from 'libs/shared/interface/order.interface';

export class ReqGetPageDto {
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
