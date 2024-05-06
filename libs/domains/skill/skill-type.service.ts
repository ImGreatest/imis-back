import { Injectable } from '@nestjs/common';
import { SkillTypeRepository } from 'libs/domains/skill/repositories/skill-type.repository';
import { IResSkillTypeFindAllDto } from 'libs/domains/skill/dto/res-dto/res-skill-type-find-all.dto';
import { IResSkillTypeDto } from 'libs/domains/skill/dto/res-dto/res-skill-type.dto';

@Injectable()
export class SkillTypeService {
  constructor(private readonly skillTypeRep: SkillTypeRepository) {}

  async findAll(): Promise<IResSkillTypeFindAllDto[]> {
    return this.skillTypeRep.findAll();
  }

  async createSkillType(skillType: string): Promise<IResSkillTypeDto> {
    return this.skillTypeRep.createSkillType(skillType);
  }

  async deleteSkillType(id: number): Promise<IResSkillTypeDto> {
    return this.skillTypeRep.deleteSkillType(id);
  }
}
