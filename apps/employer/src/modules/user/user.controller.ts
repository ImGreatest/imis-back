import { Controller, Get } from '@nestjs/common';
import { Public } from 'libs/decorators/public.decorator';

@Controller('user')
export class UserController {
  @Public()
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
