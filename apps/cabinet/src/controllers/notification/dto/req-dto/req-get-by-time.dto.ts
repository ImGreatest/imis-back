import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate } from "class-validator";

export class ReqGetByTimeDto {
	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent: Date;

	@ApiProperty({ example: true })
	@IsBoolean()
	visible?: boolean;
}
