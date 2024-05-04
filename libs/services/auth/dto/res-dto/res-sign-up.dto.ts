import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';

export class ResSignUpDto {
  @ApiProperty()
  @IsString()
  access!: string;

  @ApiProperty()
  @IsString()
  refresh!: string;

  @ApiProperty()
  user!: IResUser;
}
