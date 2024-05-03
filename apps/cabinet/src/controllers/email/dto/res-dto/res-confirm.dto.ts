import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ResConfirmDto {
	@ApiProperty()
	@IsNumber()
	access!: number;
}
