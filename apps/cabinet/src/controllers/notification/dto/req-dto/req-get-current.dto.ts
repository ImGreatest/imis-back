import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber } from "class-validator";
import { NotifacationStatus } from "@prisma/client";

export class ReqGetCurrentDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	senderId: number;

	@ApiProperty({ example: 2 })
	@IsNumber()
	recipientId: number;

	@ApiProperty({ example: NotifacationStatus.read })
	status: NotifacationStatus;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent?: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible?: boolean;
}
