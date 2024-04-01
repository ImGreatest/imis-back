import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IUpdateSuccess } from 'libs/domains/success/interface/update.success';

export class ReqUpdateSuccessDto implements IUpdateSuccess {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  userId?: number;
}
