import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IFilter } from 'libs/domains/rating/interface/filter.rating';

export class ReqGetScoreDto {
  @ApiProperty()
  @IsNumber()
  page: number;
  @ApiProperty()
  @IsNumber()
  pageSize: number;
  @ApiProperty()
  @IsString()
  sortDirection: 'asc' | 'desc';
  @ApiProperty()
  @IsString()
  column: string;
  @ApiProperty({ example: [{ column: 'scoreRating', value: 5 }] })
  filters: IFilter[];
}
