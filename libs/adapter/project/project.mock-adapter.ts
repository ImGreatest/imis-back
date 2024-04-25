import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'libs/domains/project/repositories/project.repository';
import { IReqCreateProjectDto } from 'libs/domains/project/dto/req-create-project.dto';
import { IReqGetProject } from 'libs/domains/project/dto/req-get-project.dto';
import { IReqUpdateProjectDto } from 'libs/domains/project/dto/req-update-project.dto';
import { Project } from "libs/domains/project/entities/project";
import { User } from "libs/domains/user/entities/user";

@Injectable()
export class ProjectMockAdapter extends ProjectRepository {
  constructor() {
    super();
  }

  async createProject(data: IReqCreateProjectDto): Promise<Project> {
    throw new Error(`${data}`);
  }

  async getProjects(): Promise<IReqGetProject> {
    throw new Error();
  }

  async getProjectByUser(user: User): Promise<IReqGetProject> {
    throw new Error(`${user}`);
  }

  async getProjectById(id: number): Promise<IReqGetProject> {
    throw new Error(`${id}`);
  }

  async updateProject(data: IReqUpdateProjectDto): Promise<Project> {
    throw new Error(`${data}`);
  }

  async deleteProject(projectId: number): Promise<void> {
    throw new Error(`${projectId}`);
  }
}
