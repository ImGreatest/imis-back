import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ProjectController],
})
export class ProjectControllerModule {}
