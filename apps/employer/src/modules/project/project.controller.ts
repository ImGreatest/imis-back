import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Patch,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from 'libs/entity/project';
import { ProjectCreateDto } from './req-dto/project-create.dto';
import { ProjectUpdateDto } from './req-dto/project-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { JwtService } from '@nestjs/jwt';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';

@Controller('project')
@ApiBearerAuth()
@ApiTags('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly jwtService: JwtService
  ) {}

  @checkAbilities({
      action: 'read',
      subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Get('/:page')
  getPageProjects(@Param('page') page: number) {
    return this.projectService.getPageProjects(page);
  }

  @checkAbilities({
      action: 'read',
      subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Get('/list/:id')
  getProjectList(@Param('id') userId: number) {
    return this.projectService.getProjectList(userId);
  }

  @checkAbilities({
      action: 'create',
      subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Post('/create')
  createProject(@Body() createProjectDto: ProjectCreateDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @checkAbilities({
      action: 'update',
      subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Put('/update/:id')
  updateProject(@Param('id') id: number, @Body() updateProjectData: ProjectUpdateDto) {
    return this.projectService.updateProject(id, updateProjectData);
  }

}