import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResSkillTypeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  name: string;
}
