import { Module } from '@nestjs/common';
import { SkillModule } from 'libs/domains/skill/skill.module';
import { SkillController } from './skill.controller';
import { SkillControllerService } from './skill.controller.service';
import { SkillTypeModule } from 'libs/domains/skill/skill-type.module';

@Module({
  imports: [SkillModule, SkillTypeModule],
  providers: [SkillControllerService],
  controllers: [SkillController],
})
export class SkillControllerModule {}
