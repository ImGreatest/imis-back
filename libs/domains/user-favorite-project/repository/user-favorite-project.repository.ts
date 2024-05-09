import { Injectable } from "@nestjs/common";
import { IGetSubsDto } from "../dto/res-dto/get-subs.dto";
import { ISubscribeOnProjectDto } from "../dto/req-dto/subscribe-on-project.dto";
import { IUnsubscribeOnProjectDto } from "../dto/req-dto/unsubscribe-on-project.dto";

@Injectable()
export abstract class UserFavoriteProjectRepository {
	abstract subProject(data: ISubscribeOnProjectDto): Promise<void>;

	abstract getSubsByUser(userId: number): Promise<IGetSubsDto[]>;

	abstract getSubsByProject(projectId: number): Promise<IGetSubsDto[]>;

	abstract unsubProject(data: IUnsubscribeOnProjectDto): Promise<void>;
}
