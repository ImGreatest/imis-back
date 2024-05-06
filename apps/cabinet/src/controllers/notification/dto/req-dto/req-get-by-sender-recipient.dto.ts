import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber } from "class-validator";

export class ReqGetBySenderRecipientDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	senderId: number;
	@ApiProperty({ example: 2 })
	@IsNumber()
	recipientId: number;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent?: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible?: boolean
}
