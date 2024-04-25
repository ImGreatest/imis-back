import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'libs/decorators/public.decorator';
import { ReqSignInDto } from 'libs/services/auth/dto/req-dto/req-sign-in.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResSignInDto } from "libs/services/auth/dto/res-dto/res-sign-in.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({ type: ReqSignInDto })
  signIn(@Body(new ValidationPipe()) signInDto: ReqSignInDto): Promise<ResSignInDto> {
    return this.authService.signIn(signInDto);
  }
}
