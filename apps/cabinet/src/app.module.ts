import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'libs/services/auth/auth.module';
import { AuthGuard } from 'libs/services/auth/guard/auth.guard';
import { RolesGuard } from 'libs/services/auth/guard/roles.guard';
import { EmailControllerModule } from "apps/cabinet/src/controllers/email/email-controller.module";
import {
  LanguageSchemeControllerModule
} from "apps/cabinet/src/controllers/language-scheme/language-scheme-controller.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailControllerModule,
    UserControllerModule,
    LanguageSchemeControllerModule,
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
