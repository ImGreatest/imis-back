import { Module } from '@nestjs/common';
import { SuccessService } from './success.service';
@Module({
  providers: [SuccessService],
  exports: [SuccessService],
})
export class SuccessModule {}
