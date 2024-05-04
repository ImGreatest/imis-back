import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/services/auth/guard/auth.guard';
import { AuthModule } from 'libs/services/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RatingControllerModule } from './modules/rating/rating.controller.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ScheduleModule.forRoot(),
    RatingControllerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
