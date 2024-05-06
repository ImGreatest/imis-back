import { NotifacationStatus } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate } from "class-validator";

export class ReqGetByStatusDto {
	@ApiProperty({ example: NotifacationStatus.read })
	status: NotifacationStatus;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent?: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible?: boolean;
}
