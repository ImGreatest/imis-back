import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResSignInDto {
  @ApiProperty()
  @IsString()
  access!: string;

  @ApiProperty()
  @IsString()
  refresh!: string;
}
