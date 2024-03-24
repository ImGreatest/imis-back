import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CronModule } from 'libs/services/cron/cron.module';
@Module({
  imports: [CronModule],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
