import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SubscribeOnProjectDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  projectId!: number;
}
