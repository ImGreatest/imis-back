import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'libs/services/auth/auth.module';
import { AuthGuard } from 'libs/services/auth/guard/auth.guard';

@Module({
  imports: [PrismaModule, AuthModule, UserControllerModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
