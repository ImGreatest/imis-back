import { Module } from '@nestjs/common';
import { RatingControllerService } from './rating.controller.service';
import { RatingModule } from 'libs/domains/rating/rating.module';
import { RatingController } from './rating.controller';

@Module({
  imports: [RatingModule],
  providers: [RatingControllerService],
  controllers: [RatingController],
})
export class RatingControllerModule {}
