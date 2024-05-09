import { Injectable } from "@nestjs/common";
import {
	UserFavoriteProjectService
} from "../../../../../libs/domains/user-favorite-project/user-favorite-project.service";
import { GetSubsDto } from "./dto/res-dto/get-subs.dto";
import { UnsubscribeOnProjectDto } from "./dto/req-dto/unsubscribe-on-project.dto";
import { SubscribeOnProjectDto } from "./dto/req-dto/subscribe-on-project.dto";

@Injectable()
export class UserFavoriteProjectControllerService {
	constructor(private userFavorPrjService: UserFavoriteProjectService) {}

	subProject(data: SubscribeOnProjectDto): Promise<void> {
		return this.userFavorPrjService.subProject(data);
	}

	getSubsByUser(userId: number): Promise<GetSubsDto[]> {
		return this.userFavorPrjService.getSubsByUser(userId);
	}

	getSubsByProject(projectId: number): Promise<GetSubsDto[]> {
		return this.userFavorPrjService.getSubsByProject(projectId);
	}

	unsubProject(data: UnsubscribeOnProjectDto): Promise<void> {
		return this.userFavorPrjService.unsubProject(data);
	}
}
