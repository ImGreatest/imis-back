import { Module } from '@nestjs/common';
import { SkillModule } from 'libs/domains/skill/skill.module';
import { SkillController } from './skill.controller';
import { SkillControllerService } from './skill.controller.service';

@Module({
  imports: [SkillModule],
  providers: [SkillControllerService],
  controllers: [SkillController],
})
export class SkillControllerModule {}
