import { Module } from '@nestjs/common';
import { SkillTypeService } from 'libs/domains/skill/skill-type.service';
import { SkillTypeRepository } from 'libs/domains/skill/repositories/skill-type.repository';
import { SkillTypeAdapter } from 'libs/adapter/skill-type/skill-type.adapter';

@Module({
  providers: [
    SkillTypeService,
    {
      provide: SkillTypeRepository,
      useClass: SkillTypeAdapter,
    },
  ],
  exports: [SkillTypeService],
})
export class SkillTypeModule {}
