import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'libs/domains/project/repositories/project.repository';
import { IReqGetProject } from "libs/domains/project/dto/req-get-project.dto";
import { IReqCreateProjectDto } from "libs/domains/project/dto/req-create-project.dto";
import { Project } from "libs/entity/project";
import { User } from "libs/entity/user";
import { IReqUpdateProjectDto } from "libs/domains/project/dto/req-update-project.dto";

@Injectable()
export class ProjectAdapter extends ProjectRepository {
  constructor() {
    super();
  }

  async createProject(data: IReqCreateProjectDto): Promise<Project> {
    return Promise.resolve(undefined);
  }

  async getProjects(): Promise<IReqGetProject> {
    return undefined
  }

  async getProjectByUser(user: User): Promise<IReqGetProject> {
    return Promise.resolve(undefined);
  }

  async getProjectById(id: number): Promise<IReqGetProject> {
    return Promise.resolve(undefined);
  }

  async updateProject(data: IReqUpdateProjectDto): Promise<Project> {
    return Promise.resolve(undefined);
  }

  async deleteProject(projectId: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}
