import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqSubscribeOnUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  favoriteId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  ownerId: number;
}
