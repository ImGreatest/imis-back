import { Injectable } from "@nestjs/common";
import { UserFavoriteProjectRepository } from "../../domains/user-favorite-project/repository/user-favorite-project.repository";
import { IGetSubsDto } from "../../domains/user-favorite-project/res-dto/get-subs.dto";

@Injectable()
export class UserFavoriteProjectMockAdapter extends UserFavoriteProjectRepository {
	constructor() {
		super();
	}

	async subProject(subscriberId: number, projectId: number): Promise<void> {
		throw new Error(`${subscriberId}, ${projectId}`);
	}

	async getSubsByUser(subscriberId: number): Promise<IGetSubsDto[]> {
		throw new Error(`${subscriberId}`);
	}

	async getSubsByProject(projectId: number): Promise<IGetSubsDto[]> {
		throw new Error(`${projectId}`);
	}

	async unsubProject(subscriberId: number, projectId: number): Promise<void> {
		throw new Error(`${subscriberId}, ${projectId}`);
	}
}
