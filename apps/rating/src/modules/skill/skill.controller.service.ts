import { Injectable } from '@nestjs/common';
import { ICreateSkill } from 'libs/domains/skill/dto/req-dto/req-create-skill.dto';
import { SkillService } from 'libs/domains/skill/skill.service';
import { ResSkillTypeFindAllDto } from "apps/rating/src/modules/skill/dto/res-dto/res-skill-type-find-all.dto";
import { ResFindAllFromUserDto } from "apps/rating/src/modules/skill/dto/res-dto/res-find-all-from-user.dto";
import { ResFindAllFromProjectDto } from "apps/rating/src/modules/skill/dto/res-dto/res-find-all-from-project.dto";
import { ResCreateSkillDto } from "apps/rating/src/modules/skill/dto/res-dto/res-create-skill.dto";
import { ResSkillTypeDto } from "apps/rating/src/modules/skill/dto/res-dto/res-skill-type.dto";

@Injectable()
export class SkillControllerService {
  constructor(private skillService: SkillService) {}

  findAll(): Promise<ResSkillTypeFindAllDto[]> {
    return this.skillService.findAll();
  }
  findAllFromUser(userId: number): Promise<ResFindAllFromUserDto[]> {
    return this.skillService.findAllFromUser(userId);
  }

  findAllFromProject(projectId: number): Promise<ResFindAllFromProjectDto[]> {
    return this.skillService.findAllFromProject(projectId);
  }

  create(skill: ICreateSkill): Promise<ResCreateSkillDto> {
    return this.skillService.create(skill);
  }
  createSkillType(skillType: string): Promise<ResSkillTypeDto> {
    return this.skillService.createSkillType(skillType);
  }

  delete(id: number): Promise<ResCreateSkillDto> {
    return this.skillService.delete(id);
  }

  deleteSkillType(id: number): Promise<ResSkillTypeDto> {
    return this.skillService.deleteSkillType(id);
  }
}
