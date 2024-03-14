import { Controller, Get, UseGuards } from '@nestjs/common';
// import { Public } from 'libs/decorators/public.decorator';
import { checkAbilites } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @checkAbilites({ action: 'read', subject: 'User' })
  @UseGuards(AbilitiesGuard)
  @ApiBearerAuth()
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
