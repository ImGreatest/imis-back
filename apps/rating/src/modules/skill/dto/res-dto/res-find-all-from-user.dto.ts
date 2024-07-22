import { ApiProperty } from '@nestjs/swagger';

export class ResFindAllFromUserDto {
  @ApiProperty()
  userSkils: {
    skills: {
      id: number;
      name: string;
    };
  }[];
}
