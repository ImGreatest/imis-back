import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';

export class CreateSkillDto implements ICreateSkill {
  @ApiProperty({ example: 'python' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  skillTypeId: number;
}
