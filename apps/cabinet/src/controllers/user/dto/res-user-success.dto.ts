import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ResStudentSuccessDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  surname: string;
  @ApiProperty()
  direction: { name: string };
  @ApiProperty()
  group: { name: string };
}
