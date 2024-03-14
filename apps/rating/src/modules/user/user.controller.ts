import { Controller, Get, Param, UseGuards } from '@nestjs/common';
// import { Public } from 'libs/decorators/public.decorator';
import { checkAbilites } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @checkAbilites({ action: 'update', subject: 'User' })
  @UseGuards(AbilitiesGuard)
  @ApiBearerAuth()
  @Get('/:id')
  findAll(@Param('id') id: number): string {
    console.log(id);
    return 'This action returns all cats';
  }
}
