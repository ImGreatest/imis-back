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
import { InternalServerErrorException } from '@nestjs/common';
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
        // Проверка на пустой ввод и наличие ID
        if (!employerId || !employerData) throw new BadRequestException('Invalid input data');

        // Проверка на наличие работодателя в базе данных
        const employer = await this.employerRepository.findOne({ where: { id: parseInt(employerId) } });
        if (!employer) throw new NotFoundException('Employer not found');

        // Обновление данных работодателя
        this.employerRepository.merge(employer, employerData);

        // Сохранение и возвращение обновленного работодателя
        const updatedEmployer = await this.employerRepository.save(employer);
        if (!updatedEmployer) throw new InternalServerErrorException('Failed to update employer');

        return updatedEmployer;
}
    
// async createProject(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
//   const { employerId, title, description, developers, stage, techStack } = createProjectDto;

//   const employer = await this.employerRepository.findOne({ where: { id: parseInt(employerId) } });

//   if (!employer) {
//     throw new NotFoundException('Employer with this id does not exist');
//   }

//   if (!title || !description || !stage || !techStack) {
//     throw new BadRequestException('Required fields are missing');
//   }

//   const newProject = this.projectsRepository.create({
//     description: description,
//     creatorId: parseInt(employerId),
//     stage: stage,
//     techStack: techStack
//   });

//   const savedProject = await this.projectsRepository.save(newProject);

//   await Promise.all(developers.map(async (developerId) => {
//     const developer = await this.userRepository.findOne({ where: { id: parseInt(developerId) } });

//     if (!developer) {
//       throw new NotFoundException(`Developer with id ${developerId} does not exist`);
//     }

//     await this.projectDevelopersRepository.create({
//       projectId: savedProject.id, 
//       developerId: developer.id
//     });
//   }));

//   return savedProject;
// }

async updateProject(updateProjectDto: UpdateProjectDto, userId: string, employerId: string): Promise <Project> {
  const { projectId, title, description, developers, stage, techStack } = updateProjectDto;

  // Проверка на существование проекта
  const project = await this.projectsRepository.findOne({ where: { id: parseInt(projectId)} });

  if (!project) {
      throw new NotFoundException('Проект с таким id не существует');
  }

  const user = await this.userRepository.findOne({ where: { id: parseInt(projectId) } });

  if (!user) {
      throw new NotFoundException('Пользователя с таким id не существует');
  }


  if (title) {
      project.title = title;
  }
  if (description) {
      project.description = description;
  }
  // if (stage) {
  //     project.stage = stage;
  // }
  // if (techStack) {
  //     project.techStack = techStack;
  // }
  const updatedProject = await this.projectsRepository.save(project);

  return updatedProject;
}
      async updateEmployerData(employerId: string, employerData: Partial<Employer>): Promise<Employer> {
        // Обновление данных работодателя...
      }
      

      
      async filterStudents(filterData: FilterDto): Promise<Student[]> {
        // Фильтрация и поиск студентов...
      }
    }
    
