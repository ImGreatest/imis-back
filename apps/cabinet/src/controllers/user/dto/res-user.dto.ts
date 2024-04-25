import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ResUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNumber()
  roleId: number;

  @ApiProperty()
  @IsString()
  pass: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  course?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  direction?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  group?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updateAt?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  deletedAt?: Date;
}
