import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { ProjectController } from './project/project.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/services/auth/auth.guard';
import { RolesGuard } from 'libs/services/auth/roles.guard';

@Module({
  imports: [
    PrismaModule,
    // UserModule,
    UserControllerModule,
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
  controllers: [ProjectController],
})
export class AppModule {}
