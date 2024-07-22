import { Injectable } from '@nestjs/common';
import { SkillRepository } from 'libs/domains/skill/repositories/skill.repository';
import { IResFindAllFromUserDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-user.dto';
import { IResFindAllFromProjectDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-project.dto';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { IResCreateSkillDto } from 'libs/domains/skill/dto/res-dto/res-create-skill.dto';

@Injectable()
export class SkillsMockAdapter extends SkillRepository {
  constructor() {
    super();
  }

  async findAllFromUser(userId: number): Promise<IResFindAllFromUserDto[]> {
    throw new Error(`${userId}`);
  }

  async findAllFromProject(
    projectId: number,
  ): Promise<IResFindAllFromProjectDto[]> {
    throw new Error(`${projectId}`);
  }

  async create(skill: ICreateSkill): Promise<IResCreateSkillDto> {
    throw new Error(`${skill}`);
  }

  async delete(id: number): Promise<IResCreateSkillDto> {
    throw new Error(`${id}`);
  }
}
