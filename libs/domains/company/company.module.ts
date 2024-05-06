import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
// Подразумевается, что PrismaModule уже импортирован где-то в вашем приложении

@Module({
  providers: [CompanyService],
  exports: [CompanyService], // Экспортируйте CompanyService, если он требуется в других модулях вашего приложения
})
export class CompanyModule {}
