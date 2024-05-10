import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from 'libs/services/auth/payloads/payload.interface';
import { config } from 'config/config';
import { randomBytes } from 'crypto';
import { Request } from 'express';
import { DateTime } from 'luxon';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ReqRefreshDto } from 'libs/services/auth/dto/req-dto/req-refresh.dto';
import { UserService } from 'libs/domains/user/user.service';
import { ResSignInDto } from 'libs/services/auth/dto/res-dto/res-sign-in.dto';
import { IResUser } from '../../domains/user/dto/res-dto/res-user.dto';
import { RoleService } from '../../domains/role/role.service';

@Injectable()
export class AuthTokenService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  generateJwt(payload: IPayload): string {
    return this.jwtService.sign(payload, {
      secret: config.JwtSecret,
      expiresIn: config.JwtExpiresIn,
    });
  }

  async generateRefreshToken(
    userId: number,
    deviceId: string,
  ): Promise<string> {
    const token = await this.prisma.refreshToken.create({
      data: {
        token: randomBytes(config.RefreshLength).toString('hex'),
        deviceId: deviceId,
        userId: userId,
        expieres_at: DateTime.now().plus({ month: 1 }).toJSDate(),
      },
    });

    return token.token;
  }

  async refresh(data: ReqRefreshDto): Promise<ResSignInDto> {
    const oldRefresh = await this.prisma.refreshToken.findUnique({
      where: {
        token_deviceId: {
          token: data.token,
          deviceId: data.deviceId,
        },
      },
    });
    const roleUser: IResUser = await this.userService.getUserById(
      oldRefresh.userId, 
    );

    if (!oldRefresh || !roleUser) {
      throw new Error('Ошибка авторизации');
    }

    this.prisma.refreshToken.delete({
      where: {
        token_deviceId: {
          token: data.token,
          deviceId: data.deviceId,
        },
      },
    });
    const accessPayload: IPayload = {
      sub: oldRefresh.userId,
      role: roleUser.roleId, 
      name: roleUser.name,
      surname: roleUser.surname,
      course: roleUser.course,
      direction: roleUser.direction,
      groupId: roleUser.groupId,
      description: roleUser.description,
    };
    const access: string = this.generateJwt(accessPayload);
    const refresh: string = await this.generateRefreshToken(
      oldRefresh.userId,
      oldRefresh.deviceId,
    );

    return {
      access: access,
      refresh: refresh,
      permissions: this.roleService.getPermisionsByRoleId(roleUser.roleId),
      id: roleUser.id,
    };
  }

  extractJwtData(request: Request): { sub: string; role: string } {
    if (!request.headers.authorization) {
      return;
    }
    const jwtToken: string = request.headers.authorization.split('')[1];

    return this.jwtService.decode(jwtToken, { json: true }) as {
      sub: string;
      role: string;
    };
  }
}
