import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'libs/domains/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { config } from 'config/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.JwtSecret,
      signOptions: { expiresIn: `${config.JwtExpiresIn}` },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
