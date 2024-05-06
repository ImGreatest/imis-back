import { ApiProperty } from "@nestjs/swagger";

export class ResFindAllFromProjectDto {
	@ApiProperty()
	projectSkils: {
		skils: {
			id: number;
			name: string;
		}
	}[];
}
