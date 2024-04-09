import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUpdateRole } from 'libs/domains/role/interface/update.role.interface';

export class ReqUpdateRoleDto implements IUpdateRole {
  @ApiProperty()
  @IsString()
  name?: string;
}
