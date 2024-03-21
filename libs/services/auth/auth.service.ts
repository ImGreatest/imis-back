import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'libs/domains/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IsignUp } from './interface/signUp';
import * as bcrypt from 'bcrypt';
import { config } from 'config/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(mail: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(mail);
    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }
    const isMatch = await bcrypt.compare(user?.pass, pass);
    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      userSurname: user.surname,
      role: user.roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(signUpData: IsignUp) {
    const user = await this.usersService.findOneByEmail(signUpData.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hash = await bcrypt.hash(signUpData.pass, config.HashSaltRound);
    signUpData.pass = hash;
    const createdUser = await this.usersService.createUser(signUpData);
    console.log(createdUser);
    console.log(signUpData);
    const payload = {
      sub: createdUser.id,
      username: createdUser.name,
      userSurname: createdUser.surname,
      role: createdUser.roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
