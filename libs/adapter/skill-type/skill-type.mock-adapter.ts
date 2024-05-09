import { Injectable } from '@nestjs/common';
import { SkillTypeRepository } from 'libs/domains/skill/repositories/skill-type.repository';
import { IResSkillTypeDto } from 'libs/domains/skill/dto/res-dto/res-skill-type.dto';
import { IResSkillTypeFindAllDto } from 'libs/domains/skill/dto/res-dto/res-skill-type-find-all.dto';

@Injectable()
export class SkillTypeMockAdapter extends SkillTypeRepository {
  constructor() {
    super();
  }

  async findAll(): Promise<IResSkillTypeFindAllDto[]> {
    throw new Error();
  }

  async createSkillType(skillType: string): Promise<IResSkillTypeDto> {
    throw new Error(`${skillType}`);
  }

  async deleteSkillType(id: number): Promise<IResSkillTypeDto> {
    throw new Error(`${id}`);
  }
}
