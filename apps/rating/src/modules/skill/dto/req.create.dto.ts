import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { ICreateSkill } from 'libs/domains/skill/interface/req.create.interface';

export class CreateSkillDto implements ICreateSkill {
  @ApiProperty({ example: 'python' })
  @IsString()
  name: string;
  @ApiProperty({ example: 1 })
  @IsInt()
  skillTypeId: number;
}
