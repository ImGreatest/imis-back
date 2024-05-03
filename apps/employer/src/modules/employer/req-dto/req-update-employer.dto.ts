// src/employer/dto/update-employer.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateEmployerDto {
  @ApiProperty({
    type: String,
    description: 'Имя',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Электронная почта',
    required: false
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  password?: string;
}