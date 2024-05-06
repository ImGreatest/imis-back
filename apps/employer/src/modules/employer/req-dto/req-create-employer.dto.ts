import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class ReqCreateEmployerDto {
    @ApiProperty({
        type: 'id',
        description: '0000-0000-0000-0000',
    })
    @MaxLength(255)
    id!: number;

    @ApiProperty({
        type: 'name',
        description: 'Имя',
    })
    @MaxLength(255)
    name!: string;

    @ApiProperty({
        type: 'email',
        description: 'Электронная почта',
    })
    @IsEmail()
    @MaxLength(255)
    email!: string;

    @ApiProperty({
        type: 'password',
        description: 'Пароль',
    })
    @MaxLength(255)
    password!: string;
}