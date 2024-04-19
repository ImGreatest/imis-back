import { User } from "../../../../../../libs/entity/user";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class ResGetUserAndCountDto {
	@ApiProperty()
	@IsArray()
	rows: User[];

	@ApiProperty()
	@IsNumber()
	count: number;
}