import { Injectable } from '@nestjs/common';
import { IResFindAllFromUserDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-user.dto';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { IResCreateSkillDto } from 'libs/domains/skill/dto/res-dto/res-create-skill.dto';
import { IResFindAllFromProjectDto } from 'libs/domains/skill/dto/res-dto/res-find-all-from-project.dto';

@Injectable()
export abstract class SkillRepository {
  abstract findAllFromUser(userId: number): Promise<IResFindAllFromUserDto[]>;

  abstract findAllFromProject(
    projectId: number,
  ): Promise<IResFindAllFromProjectDto[]>;

  abstract create(skill: ICreateSkill): Promise<IResCreateSkillDto>;

  abstract delete(id: number): Promise<IResCreateSkillDto>;
}
