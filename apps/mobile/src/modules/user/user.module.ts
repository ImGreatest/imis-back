import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user-controller.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
