import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { IUpdatePermission } from 'libs/domains/permission/interface/update.permission.interface';

export class ReqUpdatePermissionDto implements IUpdatePermission {
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
  @IsObject()
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
