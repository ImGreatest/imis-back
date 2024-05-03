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
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployerService } from './employer.service';
import { Employer } from 'libs/entity/employer';
import { CreateProjectDto } from './req-dto/create-project.dto';
import { Project } from 'libs/entity/project';
import { UpdateProjectDto } from './req-dto/update-roject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkAbilities } from 'libs/decorators/abilities.decorator';
import { JwtService } from '@nestjs/jwt';
import { AbilitiesGuard } from 'libs/services/casl/ability.guard';

@Controller('employer')
@ApiBearerAuth()
@ApiTags('employer')
export class EmployerController{
  constructor(
    private readonly employerService: EmployerService,
    @InjectRepository(Project)
    private projectService: Repository<Project>,
    private readonly jwtService: JwtService
  ) {}
  
  @checkAbilities({
    action: 'read',
    subject: 'Employer'
  })
  @UseGuards(AbilitiesGuard)
  @Get('/page-:page')
  async getPageEmployers() {
    return this.employerService.getPageEmployers();
  }

  @checkAbilities({
    action: 'read',
    subject: 'Employer'
  })
  @UseGuards(AbilitiesGuard)
  @Get(':id')
  async getListEmployers(@Param('id') id: number) {
    return this.employerService.getListEmployers(id.toString());
  }

  @checkAbilities({
    action: 'delete',
    subject: 'Employer'
  })
  @UseGuards(AbilitiesGuard)
  @Delete(':id')
  async removeEmployer(@Param('id') employerId: number) {
    return this.employerService.remove(employerId.toString());
  }

  @checkAbilities({
    action: 'update',
    subject: 'Employer'
  })
  @UseGuards(AbilitiesGuard)
  @Put(':id')
  async updateEmployer(@Param('id') id: string, @Body() employer: Employer, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token);
    return this.employerService.update(id, employer);
  }

  @checkAbilities({
    action: 'create',
    subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Post('/project')
  async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token);
    const userId = parseInt(payload['sub']);
    return this.employerService.createProject(createProjectDto, userId);
  }

  @checkAbilities({
    action: 'update',
    subject: 'Project'
  })
  @UseGuards(AbilitiesGuard)
  @Put('/project/:id')
  async updateProject(@Param('id') projectId: string, @Body() updateProjectData: UpdateProjectDto, @Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token);
    return this.employerService.updateProject(updateProjectData, projectId);
  }

  
}