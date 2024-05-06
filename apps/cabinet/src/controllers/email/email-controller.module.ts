import { Module } from '@nestjs/common';
import { EmailModule } from 'libs/services/email/email.module';
import { EmailControllerService } from 'apps/cabinet/src/controllers/email/email-controller.service';
import { EmailController } from 'apps/cabinet/src/controllers/email/email.controller';

@Module({
  imports: [EmailModule],
  providers: [EmailControllerService],
  controllers: [EmailController],
})
export class EmailControllerModule {}
