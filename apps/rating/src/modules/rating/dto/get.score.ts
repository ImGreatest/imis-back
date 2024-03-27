import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
}
