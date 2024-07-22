import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageTextDto {
  @ApiProperty({ example: '@mail.ru' })
  @IsString()
  to!: string;

  @ApiProperty({ example: 'Example subject' })
  @IsString()
  subject!: string;

  @ApiProperty({ example: 'Test text' })
  @IsString()
  text!: string;
}

export class MessageHtmlDto {
  @ApiProperty({ example: '@mail.ru' })
  @IsString()
  to!: string;

  @ApiProperty({ example: 'Example subject' })
  @IsString()
  subject!: string;
}
