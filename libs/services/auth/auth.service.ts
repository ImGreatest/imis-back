import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'libs/domains/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IsignUp } from './interface/signUp';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(mail: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(mail);
    if (user?.pass !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      userSurname: user.surname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(signUpData: IsignUp): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(signUpData.email);
    if (user) {
      throw new Error('User already exists');
    }
    this.usersService.createUser(signUpData);
    const payload = {
      sub: user.id,
      username: user.name,
      userSurname: user.surname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
