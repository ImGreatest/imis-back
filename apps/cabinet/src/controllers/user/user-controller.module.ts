import { Module } from '@nestjs/common';
import { UserControllerService } from './user-controller.service';
import { UserController } from "./user.controller";
import { UserModule } from "libs/domains/user/user.module";

@Module({
  imports: [UserModule],
  providers: [UserControllerService],
  controllers: [UserController],
})
export class UserControllerModule {}
