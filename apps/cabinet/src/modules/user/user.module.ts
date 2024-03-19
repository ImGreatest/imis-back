import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from './user-controller.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
