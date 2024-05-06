import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber } from "class-validator";

export class ReqGetByRecipientDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	recipientId: number;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent?: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible?: boolean;
}