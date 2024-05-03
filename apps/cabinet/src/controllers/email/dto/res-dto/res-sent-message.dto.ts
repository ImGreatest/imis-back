import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class ResSentMessageDto {
	@ApiProperty()
	@IsBoolean()
	state!: boolean;
}