import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNumber } from "class-validator";
import { NotifacationStatus } from "@prisma/client";

export class ReqCreateNoticeDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	id: number;

	@ApiProperty({ example: 1 })
	@IsNumber()
	senderId: number;

	@ApiProperty({ example: 2 })
	@IsNumber()
	recipientId: number;

	@ApiProperty({ example: NotifacationStatus.read })
	@IsEnum(NotifacationStatus)
	status: NotifacationStatus;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible: boolean;
}