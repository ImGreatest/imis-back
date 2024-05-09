import { Injectable } from "@nestjs/common";
import { UserFavoriteProjectRepository } from "./repository/user-favorite-project.repository";
import { IGetSubsDto } from "./dto/res-dto/get-subs.dto";
import { IUnsubscribeOnProjectDto } from "./dto/req-dto/unsubscribe-on-project.dto";
import { ISubscribeOnProjectDto } from "./dto/req-dto/subscribe-on-project.dto";

@Injectable()
export class UserFavoriteProjectService {
	constructor(private favoritePrjRep: UserFavoriteProjectRepository) {}

	subProject(data: ISubscribeOnProjectDto): Promise<void> {
		return this.favoritePrjRep.subProject(data);
	}

	getSubsByUser(userId: number): Promise<IGetSubsDto[]> {
		return this.favoritePrjRep.getSubsByUser(userId);
	}

	getSubsByProject(projectId: number): Promise<IGetSubsDto[]> {
		return this.favoritePrjRep.getSubsByProject(projectId);
	}

	unsubProject(data: IUnsubscribeOnProjectDto): Promise<void> {
		return this.favoritePrjRep.unsubProject(data);
	}
}
