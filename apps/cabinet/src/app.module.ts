import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule {}
