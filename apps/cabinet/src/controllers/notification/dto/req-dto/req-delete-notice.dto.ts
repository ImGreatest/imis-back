import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ReqDeleteNoticeDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	id: number;
}
