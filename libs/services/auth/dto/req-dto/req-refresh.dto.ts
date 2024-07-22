import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqRefreshDto {
  @ApiProperty({
    type: 'refresh token',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    type: 'deviceId',
    default: 'deviceId',
  })
  @IsString()
  deviceId!: string;
}
