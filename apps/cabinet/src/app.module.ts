import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    // UserModule,
    UserControllerModule,
  ],
})
export class AppModule {}
