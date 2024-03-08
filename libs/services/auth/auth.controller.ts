import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'libs/decorators/public.decorator';
import { AuthDto } from './dto/reqSignIn';
import { signUpDto } from './dto/reqSignUp';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: AuthDto })
  signIn(@Body(new ValidationPipe()) signInDto: AuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  @ApiBody({ type: signUpDto })
  signUp(@Body(new ValidationPipe()) signUpData: signUpDto) {
    return this.authService.signUp(signUpData);
  }
}
