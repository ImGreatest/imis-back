import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from 'libs/entity/employer';
import { ReqChangeEmailDto } from './req-dto/req-change-email.dto';
import { ReqChangePasswordDto } from './req-dto/req-change-password-dto';
import { ReqCreateEmployerDto } from './req-dto/req-create-employer.dto';
import { User } from 'libs/entity/user';
import { CreateProjectDto } from './req-dto/create-project.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user-controller.service';
import { NotFoundException, BadRequestException} from '@nestjs/common';
import { Project } from 'libs/entity/project';
import { UpdateProjectDto } from './req-dto/update-roject.dto';
@Injectable()
export class EmployerService {

    constructor(
        @InjectRepository(Employer)
        private employerRepository: Repository<Employer>,
        @InjectRepository(User)
        private userRepository: Repository<User>,   
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,

    ) {}

    async getPageEmployers(): Promise<Employer[]> {
        return await this.employerRepository.find();
    }
    
    async getListEmployers(id: string): Promise<Employer> {
      const employer = await this.employerRepository.findOne({ where: { id: Number(id) } });
    
      if (!employer) {
        throw new NotFoundException('К сожалению, такого работодателя не найдено');
      }
    
      return employer;
    }
    
      async remove(employerId: string): Promise<void> {
        const employer = await this.getListEmployers(employerId);
        
        await this.employerRepository.remove(employer);
      }
    
      async update(employerId: string, employerData: Employer): Promise<Employer> {
        const employer = await this.getListEmployers(employerId);
    
        this.employerRepository.merge(employer, employerData);
        
        return await this.employerRepository.save(employer);
      }
    
      async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const { employerId, title, description, developers, stage, techStack } = createProjectDto;
      
        const employer = await this.employerRepository.findOne({ : employerId });
        
        if (!employer) {
          throw new NotFoundException('Employer with this id does not exist');
        }
        
        if (!title || !description || !stage || !techStack) {
          throw new BadRequestException('Required fields are missing');
        }
        
        const developerEntities = await Promise.all(developers.map((id) => this.userRepository.findOne({ id })))
                                             .catch((error) => { throw new NotFoundException('One or more developers do not exist') });
        
        developerEntities.forEach((developer) => {
          if (developer.role.name.toLowerCase() !== 'developer') { // изменил developer.role.name на developer.role.title
            throw new BadRequestException('One or more users do not have the correct role (developer)');
          }
        });
        
        const newProject = this.projectsRepository.create({
          title,
          description,
          employer,
          developers: developerEntities,
          stage,
          techStack
        });
      
        return await this.projectsRepository.save(newProject);
      }

      async updateProject(updateProjectDto: UpdateProjectDto, userId: string): Promise <Project> {
        const { projectId, title, description, developers, stage, techStack } = updateProjectDto;
      
        // Проверка на существование проекта
        const project = await this.projectsRepository.findOne(projectId);
      
        if (!project) {
          throw new NotFoundException('Project with this id does not exist');
        }
      
        // Проверка на существование пользователя
        const user = await this.userRepository.findOne(userId);
      
        if (!user) {
          throw new NotFoundException('User with this id does not exist');
        }
        
        // Проверка на права пользователя.
        // if (user.role.name.toLowerCase() !== 'admin' && project.employer.id !== userId) {
        //   throw new UnauthorizedException('You do not have permission to update this project');
        // }
        
        // Проверка на существование новых разработчиков
        if (developers) {
          const developerEntities = await Promise.all(developers.map((id) =>
              this.userRepository.findOne(id)
          ));
            
          // Если не найден хоть один разработчик, генерируем ошибку.
          if (developerEntities.some(developer => developer === undefined)) {
            throw new NotFoundException('One or more developers do not exist');
          }
      
          // Проверка что выбранные пользователи являются разработчиками.
          developerEntities.forEach((developer) => {
              if (developer.role.name.toLowerCase() !== 'developer') {
                  throw new BadRequestException('One or more users do not have the correct role (developer)');
              }
          });
      
          project.developers = developerEntities;
        }
      
        // Обновление остальных полей проекта, если они предоставлены.
        if (title) {
          project.title = title;
        }
        
        if (description) {
          project.description = description;
        }
        
        if (stage) {
          project.stage = stage;
        }
        
        if (techStack) {
          project.techStack = techStack;
        }
      
        const updatedProject = await this.projectsRepository.save(project);
        
        return updatedProject;
      } 

      

      
    }
    
