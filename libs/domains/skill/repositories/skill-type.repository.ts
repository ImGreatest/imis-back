import { Injectable } from '@nestjs/common';
import { IResSkillTypeFindAllDto } from 'libs/domains/skill/dto/res-dto/res-skill-type-find-all.dto';
import { IResSkillTypeDto } from 'libs/domains/skill/dto/res-dto/res-skill-type.dto';

@Injectable()
export abstract class SkillTypeRepository {
  abstract findAll(): Promise<IResSkillTypeFindAllDto[]>;

  abstract createSkillType(skillType: string): Promise<IResSkillTypeDto>;

  abstract deleteSkillType(id: number): Promise<IResSkillTypeDto>;
}
