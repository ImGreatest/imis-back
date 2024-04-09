import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ICreateRole } from 'libs/domains/role/interface/create.role';

export class ReqCreateRoleDto implements ICreateRole {
  @ApiProperty()
  @IsString()
  name: string;
}
