import { Controller, Post, Body, ValidationPipe, Put, Get, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ReqRefreshDto } from './dto/req-dto/req-refresh.dto';
import { ReqSignInDto } from './dto/req-dto/req-sign-in.dto';
import { ReqSignUpDto } from './dto/req-dto/req-sign-up.dto';
import { ResSignInDto } from './dto/res-dto/res-sign-in.dto';
import { ResSignUpDto } from './dto/res-dto/res-sign-up.dto';
import { AuthTokenService } from './token.service';
import { Public } from 'libs/decorators/public.decorator';
import { ReqResetPasswordDto } from "libs/services/auth/dto/req-dto/req-reset-password.dto";
import { ResUserDto } from "apps/cabinet/src/controllers/user/dto/res-user.dto";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authTokenService: AuthTokenService,
  ) {}

  @Public()
  @Post('login')
  @ApiBody({ type: ReqSignInDto })
  signIn(
    @Body(new ValidationPipe()) signInDto: ReqSignInDto,
  ): Promise<ResSignInDto> {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() data: ReqRefreshDto): Promise<ResSignInDto> {
    return this.authTokenService.refresh(data);
  }

  @Public()
  @Post('sign-up')
  @ApiBody({ type: ReqSignUpDto })
  signUp(
    @Body(new ValidationPipe()) data: ReqSignUpDto,
  ): Promise<ResSignUpDto> {
    return this.authService.signUp(data);
  }

  @Put('reset-password')
  @ApiBody({ type: ReqResetPasswordDto })
  resetPassword(@Body() data: ReqResetPasswordDto): Promise<ResUserDto> {
    return this.authService.resetPassword(data);
  }

  @Get('payload')
  getPayload(
    @Req() data,
  ) {
    console.log(data['user'])
    return data['user'];
  }
}
