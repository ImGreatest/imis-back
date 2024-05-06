import { ApiProperty } from "@nestjs/swagger";

export class ReqUpdateCompany{
    @ApiProperty({
        description: 'Название компании',
    })
    name!: string;

    @ApiProperty({
        description: 'Описание компании',
    })
    description!: string;
    
    @ApiProperty({
        description: 'Контакты компании',
    })
    contacts!: string;

    @ApiProperty({
        description: 'Адрес компании',
    })
    address!: string;

    @ApiProperty({
        description: 'Стек технологий',
    })
    stack!: string;
}