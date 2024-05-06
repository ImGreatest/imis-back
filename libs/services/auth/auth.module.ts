import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'libs/domains/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { config } from 'config/config';
import { AuthTokenService } from 'libs/services/auth/token.service';
import { JwtStrategy } from 'libs/services/auth/strategy/jwt.strategy';
import { CryptoService } from 'libs/services/crypto/crypto.service';
import { RoleModule } from 'libs/domains/role/role.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.JwtSecret,
      signOptions: {
        expiresIn: config.JwtExpiresIn,
      },
    }),
    RoleModule,
  ],
  providers: [JwtStrategy, AuthTokenService, AuthService, CryptoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
