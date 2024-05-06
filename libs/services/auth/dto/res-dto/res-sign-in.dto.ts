import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResSignInDto {
  @ApiProperty()
  @IsString()
  access!: string;

  @ApiProperty()
  @IsString()
  refresh!: string;

  @ApiProperty()
  permissions: permissionsObject;
}

class permissionsObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: { action: string; condition: any }[];
}
