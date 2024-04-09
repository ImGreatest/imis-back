import {Body, Controller, Get, Param, Query,UseGuards,Delete, Patch, Post} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployerService } from './employer.service'; // Следите за правильным написанием имени сервиса, в вашем примере была ошибка
import { EmployerModule } from './employer.module';
import { ReqChangeEmailDto } from './req-dto/req-change-email.dto';
import { ReqChangePasswordDto } from './req-dto/req-change-password-dto';
import { Employer } from 'libs/entity/employer';
import { CreateProjectDto } from './req-dto/create-project.dto';
import { Project } from 'libs/entity/project';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './req-dto/update-roject.dto';
import { UnauthorizedException } from '@nestjs/common';

@ApiTags('employer')
@ApiBearerAuth()
@Controller('employer')
export class EmployerController{

    constructor(
        private readonly employerService: EmployerService,
        @InjectRepository(Project)
        private projectService: Repository<Project>,
        @InjectRepository(UpdateProjectDto)
        private updateProject: Repository<UpdateProjectDto>,
      ) {}

    @Get('get-list')
    async getPageEmployers(): Promise<Employer[]> {
        return await this.employerService.getPageEmployers();
    }

    @Get('get-page')
    async getListEmployers(@Param('id') id): Promise<Employer> {
        return await this.employerService.getListEmployers(id);
    }

    @Delete('remove/:employerId')
    async removeEmployer(@Param('employerId') employerId): Promise<void> {
        await this.employerService.remove(employerId);
    }

    @Patch('update/:employerId')
    async updateEmployer(@Param('employerId') employerId, @Body() employer: Employer): Promise<Employer> {
        return await this.employerService.update(employerId, employer);
    }

    @Post('create-project')
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.employerService.createProject(createProjectDto);
  }

  @Patch('update-project/:projectId')
async update(@Param('projectId') projectId: string, @Body() updateProjectDto: any) {
  const project = await this.projectService.findOne(projectId); // Находим проект

  if(!project) {
    throw new NotFoundException('Project not found');
  }

  // Здесь записываем обновления в экземпляр проекта
  Object.assign(project, updateProjectDto); 

  try {
    const updatedProject = await this.projectService.save(project); // сохраняем обновления
    return updatedProject;
  } catch (e) {
    // Обработка ошибок
    if (e instanceof UnauthorizedException) {
      return { message: (e as Error).message, status: 403 };
    }
    return { message: (e as Error).message };
  }
}



}