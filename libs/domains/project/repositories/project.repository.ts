import { Injectable } from '@nestjs/common';
import { IReqCreateProjectDto } from '../dto/req-create-project.dto';
import { IReqUpdateProjectDto } from '../dto/req-update-project.dto';
import { IReqGetProject } from '../dto/req-get-project.dto';
import { Project } from 'libs/domains/project/entities/project';
import { User } from 'libs/domains/user/entities/user';

@Injectable()
export abstract class ProjectRepository {
  abstract createProject(data: IReqCreateProjectDto): Promise<Project>;

  abstract getProjects(): Promise<IReqGetProject>;

  abstract getProjectByUser(user: User): Promise<IReqGetProject>;

  abstract getProjectById(id: number): Promise<IReqGetProject>;

  abstract updateProject(data: IReqUpdateProjectDto): Promise<Project>;

  abstract deleteProject(projectId: number): Promise<void>;
}
