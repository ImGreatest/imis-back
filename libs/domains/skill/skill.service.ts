import { Injectable } from '@nestjs/common';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { IResFindAllFromUserDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-user.dto';
import { IResCreateSkillDto } from 'libs/domains/skill/dto/res-dto/res-create-skill.dto';
import { SkillRepository } from 'libs/domains/skill/repositories/skill.repository';
import { IResFindAllFromProjectDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-project.dto';

@Injectable()
export class SkillService {
  constructor(private readonly skillRep: SkillRepository) {}

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

  delete(id: number): Promise<IResCreateSkillDto> {
    return this.skillRep.delete(id);
  }
}
