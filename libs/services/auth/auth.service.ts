import { Injectable, Logger } from '@nestjs/common';
import { ReqSignInDto } from "libs/services/auth/dto/req-dto/req-sign-in.dto";
import { ResSignInDto } from "libs/services/auth/dto/res-dto/res-sign-in.dto";
import { PrismaService } from "libs/services/prisma/prisma.service";
import { CryptoService } from "libs/services/crypto/crypto.service";
import { AuthTokenService } from "libs/services/auth/token.service";
import { User } from "libs/domains/user/entities/user";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
    private authTokenService: AuthTokenService
  ) {}

  async signIn(data: ReqSignInDto): Promise<ResSignInDto> {
    Logger.verbose('signIn', data);
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!user || !this.cryptoService.compareHash(data.password, user.pass)) {
      throw new Error('Неверная почта или пароль');
    }

    const access: string = this.authTokenService.generateJwt({ sub: user.id, role: user.roleId });

    Logger.verbose('Аутентификация прошла успешно', access);

    const refresh: string = await this.authTokenService.generateRefreshToken(user.id, data.deviceId);

    Logger.verbose('Токен обновлен', refresh);

    return {
      access,
      refresh
    }
  }
}
