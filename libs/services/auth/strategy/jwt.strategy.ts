import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'config/config';
import { User } from 'libs/domains/user/entities/user.entity';
import { IPayload } from 'libs/services/auth/payloads/payload.interface';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JwtSecret,
    });
  }

  async validate(payload: IPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
