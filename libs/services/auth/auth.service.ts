import { Injectable, Logger } from '@nestjs/common';
import { ReqSignInDto } from 'libs/services/auth/dto/req-dto/req-sign-in.dto';
import { ResSignInDto } from 'libs/services/auth/dto/res-dto/res-sign-in.dto';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { CryptoService } from 'libs/services/crypto/crypto.service';
import { AuthTokenService } from 'libs/services/auth/token.service';
import { User } from 'libs/domains/user/entities/user';
import { ReqSignUpDto } from 'libs/services/auth/dto/req-dto/req-sign-up.dto';
import { ResSignUpDto } from 'libs/services/auth/dto/res-dto/res-sign-up.dto';
import { BackendExceptions } from 'libs/exceptions/backend.exceptions';
import { EErrorCode } from 'libs/exceptions/enums/error-code.enum';
import { UserService } from 'libs/domains/user/user.service';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
    private authTokenService: AuthTokenService,
    private userService: UserService,
  ) {}

  async signIn(data: ReqSignInDto): Promise<ResSignInDto> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !this.cryptoService.compareHash(data.password, user.pass)) {
      // throw new Error('Неверная почта или пароль');
      throw new BackendExceptions(EErrorCode.Unauthorized, {
        messageDebug: `User with email ${data.email} and password ${data.password} is not found`,
      });
    }

    const access: string = this.authTokenService.generateJwt({
      sub: user.id,
      role: user.roleId,
    });

    Logger.verbose('Аутентификация прошла успешно', access);

    const refresh: string = await this.authTokenService.generateRefreshToken(
      user.id,
      data.deviceId,
    );

    Logger.verbose('Токен обновлен', refresh);

    return {
      access,
      refresh,
    };
  }

  async signUp(data: ReqSignUpDto): Promise<ResSignUpDto> {
    if (data.password.length < 6) {
      throw new BackendExceptions(EErrorCode.Validate, {
        messageDebug: 'Shortest length for password is six symbols!',
      });
    }

    const databaseUser: User = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (databaseUser) {
      throw new BackendExceptions(EErrorCode.Unauthorized, {
        messageDebug: `User with ${data.email} was found, please go authorization`,
      });
    }

    const user: IResUser = await this.userService.createUser({
      email: data.email,
      name: data.name,
      surname: data.surname,
      roleId: data.role,
      pass: data.password,
    });

    const access: string = this.authTokenService.generateJwt({
      sub: user.id,
      role: user.roleId,
    });

    Logger.verbose('access token - ', access);

    const refresh: string = await this.authTokenService.generateRefreshToken(
      user.id,
      data.deviceId,
    );

    Logger.verbose('refresh token - ', refresh);

    return {
      access,
      refresh,
      user,
    };
  }
}
