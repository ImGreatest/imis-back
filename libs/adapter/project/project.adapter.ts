import { Injectable, Logger } from '@nestjs/common';
import { ProjectRepository } from 'libs/domains/project/repositories/project.repository';
import { Project } from 'libs/entity/project';
import { IReqCreateProjectDto } from 'libs/domains/project/dto/req-create-project.dto';
import { IReqGetProject } from 'libs/domains/project/dto/req-get-project.dto';
import { User } from 'libs/entity/user';
import { IReqUpdateProjectDto } from 'libs/domains/project/dto/req-update-project.dto';

@Injectable()
export class ProjectAdapter extends ProjectRepository {
  constructor() {
    super();
  }

  async createProject(data: IReqCreateProjectDto): Promise<Project> {
    Logger.verbose(data);

    return Promise.resolve(undefined);
  }

  async getProjects(): Promise<IReqGetProject> {
    Logger.verbose('getProjects');

    return undefined;
  }

  async getProjectByUser(user: User): Promise<IReqGetProject> {
    Logger.verbose(user);

    return Promise.resolve(undefined);
  }

  async getProjectById(id: number): Promise<IReqGetProject> {
    Logger.verbose(id);

    return Promise.resolve(undefined);
  }

  async updateProject(data: IReqUpdateProjectDto): Promise<Project> {
    Logger.verbose(data);

    return Promise.resolve(undefined);
  }

  async deleteProject(projectId: number): Promise<void> {
    Logger.verbose(projectId);

    return Promise.resolve(undefined);
  }
}
