import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsString } from 'class-validator';

export class ResSignInDto {
  @ApiProperty()
  @IsString()
  access!: string;

  @ApiProperty()
  @IsString()
  refresh!: string;

  @ApiProperty()
  @IsJSON()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permissions: { [key: string]: { action: string; condition: any }[] };

  @ApiProperty()
  @IsNumber()
  id: number;
}
