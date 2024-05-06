import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillRepository } from './repositories/skill.repository';
import { SkillsAdapter } from 'libs/adapter/skills/skills.adapter';
import { SkillTypeRepository } from './repositories/skill-type.repository';
import { SkillTypeAdapter } from 'libs/adapter/skill-type/skill-type.adapter';

@Module({
  providers: [
    SkillService,
    {
      provide: SkillRepository,
      useClass: SkillsAdapter,
    },
    {
      provide: SkillTypeRepository,
      useClass: SkillTypeAdapter,
    },
  ],
  exports: [SkillService],
})
export class SkillModule {}
