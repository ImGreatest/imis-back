import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { ProjectController } from './project/project.controller';
import { AuthModule } from 'libs/services/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, UserControllerModule],
  controllers: [ProjectController],
})
export class AppModule {}
