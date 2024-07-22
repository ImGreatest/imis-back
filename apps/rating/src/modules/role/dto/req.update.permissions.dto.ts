import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { IUpdatePermission } from 'libs/domains/role/interface/update.permissions.interface';

export class UpdatePermissionDto implements IUpdatePermission {
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
  conditions?: {
    [key: string]: string;
  };
  @ApiProperty()
  @IsString()
  reason?: string;
}
