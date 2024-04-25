// user.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ISignUpDto } from 'libs/services/auth/interface/signUp.interface';
import { ApiProperty } from '@nestjs/swagger';

export class signUpDto implements ISignUpDto {
  @IsNotEmpty({ message: 'roleId is required' })
  @ApiProperty({ example: 1 })
  roleId: number;
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ example: 'examleple@mail.ru' })
  email: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({ example: 'Ivan' })
  name: string;

  @IsString({ message: 'Surname must be a string' })
  @IsNotEmpty({ message: 'Surname is required' })
  @ApiProperty({ example: 'Ivanov' })
  surname: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({ example: 'password' })
  pass: string;
}
