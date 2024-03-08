// user.dto.ts

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'libs/enums/role'; // Import the UserRole enum
import { IsignUp } from '../interface/signUp';
import { ApiProperty } from '@nestjs/swagger';

export class signUpDto implements IsignUp {
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

  @IsEnum(UserRole, { message: 'Invalid role' })
  @IsNotEmpty({ message: 'Role is required' })
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({ example: 'password' })
  pass: string;
}
