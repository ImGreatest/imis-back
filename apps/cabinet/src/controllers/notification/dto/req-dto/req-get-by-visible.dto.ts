import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate } from "class-validator";

export class ReqGetByVisibleDto {
	@ApiProperty({ example: true })
	@IsBoolean()
	visible: boolean;

	@ApiProperty({ example: new Date() })
	@IsDate()
	dateTimeSent?: Date;
}
