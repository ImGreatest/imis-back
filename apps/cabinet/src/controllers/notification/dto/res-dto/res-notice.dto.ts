import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber } from "class-validator";
import { NotifacationStatus } from "@prisma/client";

export class ResNoticeDto {
	@ApiProperty()
	@IsNumber()
	id: number;

	@ApiProperty()
	@IsNumber()
	senderId: number;

	@ApiProperty()
	@IsNumber()
	recipientId: number;

	@ApiProperty()
	status: NotifacationStatus;

	@ApiProperty()
	@IsDate()
	dateTimeSent: Date;

	@ApiProperty()
	@IsBoolean()
	visible: boolean;
}