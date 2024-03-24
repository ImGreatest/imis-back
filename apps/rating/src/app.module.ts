import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/services/auth/auth.guard';
import { AuthModule } from 'libs/services/auth/auth.module';
import { RolesGuard } from 'libs/services/auth/roles.guard';
import { RatingControllerModule } from './modules/rating/rating.controller.module';
import { SuccessControllerModule } from './modules/success/success.controller.module';
import { TagControllerModule } from './modules/tag/tag.controller.module';
import { RoleControllerModule } from './modules/role/role.controller.module';
import { PermissionControllerModule } from './modules/permission/permission.controller.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    AuthModule,
    RatingControllerModule,
    SuccessControllerModule,
    TagControllerModule,
    RoleControllerModule,
    PermissionControllerModule,
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
