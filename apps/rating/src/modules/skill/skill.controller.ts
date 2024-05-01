import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkillControllerService } from './skill.controller.service';
import { CreateSkillDto } from './dto/req.create.dto';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';
import { Public } from 'libs/decorators/public.decorator';

@Controller('skill')
@ApiBearerAuth()
@ApiTags('skill')
export class SkillController {
  constructor(private skillService: SkillControllerService) {}

  // @checkAbilities({
  //   action: 'read',
  //   subject: 'Skills',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @checkAbilities({
    action: 'read',
    subject: 'Skills',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/user/:userId')
  findAllFromUser(@Param('userId') userId: number) {
    return this.skillService.findAllFromUser(userId);
  }

  @checkAbilities({
    action: 'read',
    subject: 'Skills',
  })
  @UseGuards(AbilitiesGuard)
  @Get('/project/:projectId')
  findAllFromProject(@Param('projectId') projectId: number) {
    return this.skillService.findAllFromProject(projectId);
  }

  // @checkAbilities({
  //   action: 'create',
  //   subject: 'Skills',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Post()
  create(@Body() skill: CreateSkillDto) {
    return this.skillService.create(skill);
  }
  // @checkAbilities({
  //   action: 'create',
  //   subject: 'Skills',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Post('/skillType/:skillType')
  createSkillType(@Param('skillType') skillType: string) {
    return this.skillService.createSkillType(skillType);
  }

  // @checkAbilities({
  //   action: 'delete',
  //   subject: 'Skills',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.skillService.delete(id);
  }
  // @checkAbilities({
  //   action: 'delete',
  //   subject: 'Skills',
  // })
  // @UseGuards(AbilitiesGuard)
  @Public()
  @Delete('/skillType/:id')
  deleteSkillType(@Param('id') id: number) {
    return this.skillService.deleteSkillType(id);
  }
}
