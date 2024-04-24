import { Module } from '@nestjs/common';
import { UserControllerModule } from './controllers/user/user-controller.module';
import { PrismaModule } from 'libs/services/prisma/prisma.module';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [
    PrismaModule,
    // UserModule,
    UserControllerModule,
  ],
  controllers: [ProjectController],
})
export class AppModule {}
