import { Injectable } from "@nestjs/common";
import { IReqCreateProjectDto } from "../dto/req-create-project.dto";
import { IReqUpdateProjectDto } from "../dto/req-update-project.dto";
import { Project } from "../entities/project";
import { IReqGetProject } from "../dto/req-get-project.dto";
import { User } from "../../user/entities/user";

@Injectable()
export abstract class ProjectRepository {
	abstract createProject(data: IReqCreateProjectDto): Promise<Project>;

	abstract getProjects(): IReqGetProject;

	abstract getProjectByUser(user: User): IReqGetProject;

	abstract getProjectById(id: number): IReqGetProject;

	abstract updateProject(data: IReqUpdateProjectDto): Promise<Project>;

	abstract deleteProject(projectId: number): Promise<void>;
}