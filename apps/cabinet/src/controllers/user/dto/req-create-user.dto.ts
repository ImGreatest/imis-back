import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ReqCreateUserDto {
	@ApiProperty({ example: 'email123@mail.ru' })
	@IsString()
	email!: string;

	@ApiProperty({ example: 'name' })
	@IsString()
	name!: string;

	@ApiProperty({ example: 'surname' })
	@IsString()
	surname!: string;

	@ApiProperty({ example: 1 })
	@IsNumber()
	roleId!: number;

	@ApiProperty({ example: '889988' })
	@IsString()
	pass!: string;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsOptional()
	course?: number;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsOptional()
	direction?: number;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsOptional()
	group?: number;
}