import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class ReqChangeEmailDto {
  @ApiProperty({
    type: 'email',
    default: 'mail@email.com',
  })
  @IsEmail()
  @MaxLength(255)
  newEmail!: string;
}
