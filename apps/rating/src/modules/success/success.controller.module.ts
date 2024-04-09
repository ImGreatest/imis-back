import { Module } from '@nestjs/common';
import { SuccessModule } from 'libs/domains/success/success.module';
import { SuccessController } from './success.controller';
import { SuccessControllerService } from './success.controller.service';

@Module({
  imports: [SuccessModule],
  providers: [SuccessControllerService],
  controllers: [SuccessController],
})
export class SuccessControllerModule {}
