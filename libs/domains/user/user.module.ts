import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserAdapter } from 'libs/adapter/user/user.adapter';
import { CryptoModule } from 'libs/services/crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

