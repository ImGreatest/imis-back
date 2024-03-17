import { Module } from '@nestjs/common';
import { TagModule } from 'libs/domains/tag/tag.module';
import { TagControllerService } from './tag.controller.service';
import { TagController } from './tag.controller';

@Module({
  imports: [TagModule],
  providers: [TagControllerService],
  controllers: [TagController],
})
export class TagControllerModule {}
