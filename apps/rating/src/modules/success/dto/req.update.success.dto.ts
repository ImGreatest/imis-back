import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { IUpdateSuccess } from 'libs/domains/success/interface/update.success.interface';

export class ReqUpdateSuccessDto implements IUpdateSuccess {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  tags: number[];

  @ApiProperty()
  @IsNumber()
  userId: number;
}
