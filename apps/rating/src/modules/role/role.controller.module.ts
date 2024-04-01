import { Module } from '@nestjs/common';
import { RoleModule } from 'libs/domains/role/role.module';
import { RoleController } from './role.controller';
import { RoleControllerService } from './role.controller.service';

@Module({
  imports: [RoleModule],
  providers: [RoleControllerService],
  controllers: [RoleController],
})
export class RoleControllerModule {}
