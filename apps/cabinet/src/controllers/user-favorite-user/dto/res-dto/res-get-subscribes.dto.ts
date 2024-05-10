import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ResGetSubscribesDto {
	@ApiProperty()
	@IsNumber()
	favoriteId: number;

	@ApiProperty()
	@IsNumber()
	ownerId: number
}
