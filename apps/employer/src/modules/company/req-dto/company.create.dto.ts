import { ApiProperty } from "@nestjs/swagger";

export class ReqCompanyCreate {
    @ApiProperty({
        description: '1',
    })
    id: number;

    @ApiProperty({
        description: 'Тестовая компания',
    })
    name: string;
}