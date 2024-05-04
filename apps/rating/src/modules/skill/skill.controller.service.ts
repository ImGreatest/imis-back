import { Injectable } from '@nestjs/common';
import { ICreateSkill } from 'libs/domains/skill/interface/req.create.interface';
import { SkillService } from 'libs/domains/skill/skill.service';

@Injectable()
export class SkillControllerService {
  constructor(private skillService: SkillService) {}
  findAll() {
    return this.skillService.findAll();
  }
  findAllFromUser(userId: number) {
    return this.skillService.findAllFromUser(userId);
  }

  findAllFromProject(projectId: number) {
    return this.skillService.findAllFromProject(projectId);
  }

  create(skill: ICreateSkill) {
    return this.skillService.create(skill);
  }
  createSkillType(skillType: string) {
    return this.skillService.createSkillType(skillType);
  }

  delete(id: number) {
    return this.skillService.delete(id);
  }

  deleteSkillType(id: number) {
    return this.skillService.deleteSkillType(id);
  }
}
