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
import { UserFavoriteUserControllerModule } from './controllers/user-favorite-user/user-favorite-user-controller.module';
import { UserFavoriteEventControllerModule } from './controllers/user-favorite-event/user-favorite-event-controller.module';
import { EventControllerModule } from "./controllers/event/event-controller.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailControllerModule,
    UserControllerModule,
    NotificationControllerModule,
    EventControllerModule,
    UserFavoriteProjectControllerModule,
    UserFavoriteUserControllerModule,
    UserFavoriteEventControllerModule,
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
