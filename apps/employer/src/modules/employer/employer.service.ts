import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from 'libs/entity/employer';
import { User } from 'libs/entity/user';
import { NotFoundException, BadRequestException} from '@nestjs/common';
import { Project } from 'libs/entity/project';
import { UpdateProjectDto } from './req-dto/update-roject.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateEmployerDto } from './req-dto/req-update-employer.dto';
import { UnauthorizedException } from '@nestjs/common';
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
    
// Ваш сервис
async createProject(createProjectDto, userId: number) {
  // Проверка на пустой ввод
  if (!createProjectDto) throw new BadRequestException('Invalid input data');
  
  const { name, ...otherData } = createProjectDto;

  // Поиск пользователя в базе данных
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException(`User with id ${userId} does not exist.`);
  
  // Создание нового проекта
  const project = await this.projectsRepository.create({ ...otherData, name, employerId: userId });
  
  // Сохранение и возвращение нового проекта
  const savedProject = await this.projectsRepository.save(project);
  if (!savedProject) throw new InternalServerErrorException('Failed to create project');

  return savedProject;
}

async updateProject(updateProjectDto: UpdateProjectDto, userId: string): Promise <Project> {
  const { projectId, title, description, status, techStack, employerId } = updateProjectDto;

  const project = await this.projectsRepository.findOne({ where: { id: parseInt(projectId) } });

  if (!project) {
    throw new NotFoundException('Проект с таким id не существует');
  }

  if (project.creatorId !== parseInt(employerId)) {
    throw new UnauthorizedException('Вы не имеете права обновлять этот проект');
  }
  
  const user = await this.userRepository.findOne({ where: { id: parseInt(userId) } });

  if (!user) {
      throw new NotFoundException('Пользователя с таким id не существует');
  }

  if (title) {
      project.title = title;
  }
  if (description) {
      project.description = description;
  }
  if (status) {
       project.status = status;
  }
  if (techStack) {
       project.techStack = techStack;
  }

  // Здесь добавьте код для обновления developers, если это нужно. 

  const updatedProject = await this.projectsRepository.save(project);

  return updatedProject;
}

async updateEmployerData(employerId: string, employerData: UpdateEmployerDto): Promise<Employer> {
  if (!employerId || !employerData) throw new BadRequestException('Invalid input data');
  const employer = await this.employerRepository.findOne({ where: { id: parseInt(employerId) } });

  if (!employer) throw new NotFoundException('Employer not found');

  Object.assign(employer, employerData);

  const updatedEmployer = await this.employerRepository.save(employer);
  if (!updatedEmployer) throw new InternalServerErrorException('Failed to update employer');
  
  return updatedEmployer;
}

}

