import {IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { UserRole } from "../../../../../../libs/enums/role";

export class ReqCreateUserDto {

    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    email!: string;

    @IsString()
    @MaxLength(100)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    name!: string;

    @IsString()
    @MaxLength(100)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    surname!: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    password!: string;


    @IsInt()
    @IsOptional()
    course?: number;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    direction?: string;

    @IsString()
    @MaxLength(50)
    @IsOptional()
    group?: string;

    @IsEnum(UserRole)
    role!: string;
}
