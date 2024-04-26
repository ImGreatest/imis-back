import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class ReqSignUpDto {
  @ApiProperty({ example: 'test@email.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email!: string;

  @ApiProperty({ example: 'name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be string!' })
  name!: string;

  @ApiProperty({ example: 'surname' })
  @IsNotEmpty({ message: 'Surname is required' })
  @IsString({ message: 'Surname must be string!' })
  surname!: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty({ message: 'Role is required' })
  @IsNumber({}, { message: 'Role must be number' })
  @Min(1, { message: 'Role doesn`t exist' })
  role!: number;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be string!' })
  @MinLength(6, { message: 'Shortest length password is 6 symbols' })
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'DeviceId is required' })
  deviceId!: string;
}
