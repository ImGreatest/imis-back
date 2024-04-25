import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqUpdateUserDto {
  @ApiProperty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  surname!: string;
}
