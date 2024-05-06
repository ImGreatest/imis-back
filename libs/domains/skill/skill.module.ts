import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillRepository } from "libs/domains/skill/repositories/skill.repository";
import { SkillsAdapter } from "libs/adapter/skills/skills.adapter";

@Module({
  providers: [
    SkillService,
    {
      provide: SkillRepository,
      useClass: SkillsAdapter
    }
  ],
  exports: [SkillService],
})
export class SkillModule {}
