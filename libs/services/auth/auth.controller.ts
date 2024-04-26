import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ReqRefreshDto } from './dto/req-dto/req-refresh.dto';
import { ReqSignInDto } from './dto/req-dto/req-sign-in.dto';
import { ReqSignUpDto } from './dto/req-dto/req-sign-up.dto';
import { ResSignInDto } from './dto/res-dto/res-sign-in.dto';
import { ResSignUpDto } from './dto/res-dto/res-sign-up.dto';
import { AuthTokenService } from './token.service';
import { Public } from 'libs/decorators/public.decorator';

@ApiTags('auth')
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
}
