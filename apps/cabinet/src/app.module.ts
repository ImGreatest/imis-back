import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'libs/services/auth/auth.module';
import { AuthGuard } from 'libs/services/auth/guard/auth.guard';
import { EmailControllerModule } from 'apps/cabinet/src/controllers/email/email-controller.module';
import { LanguageSchemeControllerModule } from 'apps/cabinet/src/controllers/language-scheme/language-scheme-controller.module';
import { NotificationControllerModule } from 'apps/cabinet/src/controllers/notification/notification-controller.module';
import { UserFavoriteProjectControllerModule } from './controllers/user-favorite-project/user-favorite-project-controller.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailControllerModule,
    UserControllerModule,
    NotificationControllerModule,
    UserFavoriteProjectControllerModule,
    LanguageSchemeControllerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
