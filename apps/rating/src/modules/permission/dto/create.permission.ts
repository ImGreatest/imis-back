import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ICreatePermission } from 'libs/domains/permission/interface/create.permission';

export class ReqCreatePermissionDto implements ICreatePermission {
  @ApiProperty()
  @IsString()
  action: string;
  @ApiProperty()
  @IsString()
  subject: string;
  @ApiProperty()
  @IsBoolean()
  inverted?: boolean;
  @ApiProperty()
  conditions?: { [key: string]: string };
  @ApiProperty()
  @IsString()
  reason?: string;
  @ApiProperty()
  @IsNumber()
  roleId: number;
  @ApiProperty()
  @IsString()
  name: string;
}
