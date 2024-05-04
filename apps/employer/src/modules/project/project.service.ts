import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'libs/entity/project';
import { ProjectCreateDto } from './req-dto/project-create.dto';
import { ProjectUpdateDto } from './req-dto/project-update.dto';
import { RolesGuard } from 'libs/services/auth/roles.guard';
import { UserProject } from '@prisma/client';
import { PrismaService } from 'libs/services/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(
        private prisma: PrismaService, // Инъекция PrismaService
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) {}

    async getPageProjects(page: number): Promise<Project[]> {
        const projects = await this.projectRepository.find({
            skip: page*10,
            take: 10
        });
        return projects;
    }

    async getProjectList(userId: number): Promise<Project[]> {
        const projects = await this.projectRepository.find({
        });
        return projects;
    }

    async createProject(createProjectDto: ProjectCreateDto): Promise<Project> {
        const newProject = this.projectRepository.create(createProjectDto);
        await this.projectRepository.save(newProject);
        return newProject;
    }

    async updateProject(id: number, updateProjectDto: ProjectUpdateDto): Promise<Project> {
        await this.projectRepository.update(id, updateProjectDto);
        const updatedProject = await this.projectRepository.findOne({ where: { id: Number(id) } });
        return updatedProject;
    }
    async FavoriteProject(userId: number): Promise<Project[]> {
        const userProjects = await this.prisma.userProject.findMany({ where: { userId: userId } });
    
        const projectIds = userProjects.map(userProject => userProject.projectId);
          
        const projects = await this.prisma.project.findMany({ where: { id: { in: projectIds } } });
    
        return projects as any as Project[]; 
    }

}