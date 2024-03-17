import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/services/auth/auth.guard';
import { AuthModule } from 'libs/services/auth/auth.module';
import { RolesGuard } from 'libs/services/auth/roles.guard';
import { RatingControllerModule } from './modules/rating/rating.controller.module';
import { SuccessControllerModule } from './modules/success/success.controller.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    RatingControllerModule,
    SuccessControllerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
