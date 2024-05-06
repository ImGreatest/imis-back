import { Injectable } from '@nestjs/common';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { IResFindAllFromUserDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-user.dto';
import { IResCreateSkillDto } from 'libs/domains/skill/dto/res-dto/res-create-skill.dto';
import { SkillRepository } from 'libs/domains/skill/repositories/skill.repository';
import { IResFindAllFromProjectDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-project.dto';
import { IResSkillTypeFindAllDto } from 'libs/domains/skill/dto/res-dto/res-skill-type-find-all.dto';
import { IResSkillTypeDto } from 'libs/domains/skill/dto/res-dto/res-skill-type.dto';
import { SkillTypeRepository } from 'libs/domains/skill/repositories/skill-type.repository';

@Injectable()
export class SkillService {
  constructor(
    private readonly skillRep: SkillRepository,
    private readonly skillTypeRep: SkillTypeRepository
  ) {}

  async findAll(): Promise<IResSkillTypeFindAllDto[]> {
    return this.skillTypeRep.findAll();
  }

  async findAllFromUser(userId: number): Promise<IResFindAllFromUserDto[]> {
    return this.skillRep.findAllFromUser(userId);
  }

  async findAllFromProject(
    projectId: number,
  ): Promise<IResFindAllFromProjectDto[]> {
    return this.skillRep.findAllFromProject(projectId);
  }

  create(skill: ICreateSkill): Promise<IResCreateSkillDto> {
    return this.skillRep.create(skill);
  }

  async createSkillType(skillType: string): Promise<IResSkillTypeDto> {
    return this.skillTypeRep.createSkillType(skillType);
  }

  delete(id: number): Promise<IResCreateSkillDto> {
    return this.skillRep.delete(id);
  }

  async deleteSkillType(id: number): Promise<IResSkillTypeDto> {
    return this.skillTypeRep.deleteSkillType(id);
  }
}
