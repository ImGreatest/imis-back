import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionControllerService } from './permission.controller.service';
import { PermissionModule } from 'libs/domains/permission/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [PermissionControllerService],
  controllers: [PermissionController],
})
export class PermissionControllerModule {}
