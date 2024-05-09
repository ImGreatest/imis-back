import { Injectable } from "@nestjs/common";
import { UserFavoriteProjectRepository } from "../../domains/user-favorite-project/repository/user-favorite-project.repository";
import { PrismaService } from "../../services/prisma/prisma.service";
import { IGetSubsDto } from "../../domains/user-favorite-project/dto/res-dto/get-subs.dto";
import { ISubscribeOnProjectDto } from "../../domains/user-favorite-project/dto/req-dto/subscribe-on-project.dto";
import { IUnsubscribeOnProjectDto } from "../../domains/user-favorite-project/dto/req-dto/unsubscribe-on-project.dto";

@Injectable()
export class UserFavoriteProjectAdapter extends UserFavoriteProjectRepository {
	constructor(private prisma: PrismaService,) {
		super();
	}

	async subProject(data: ISubscribeOnProjectDto): Promise<void> {
		await this.prisma.userFavoriteProject.create({
			data: {
				userId: data.userId,
				projectId: data.projectId,
			}
		});
	}

	async getSubsByUser(userId: number): Promise<IGetSubsDto[]> {
		return this.prisma.userFavoriteProject.findMany({
			where: {
				userId: userId,
			}
		});
	}

	async getSubsByProject(projectId: number): Promise<IGetSubsDto[]> {
		return this.prisma.userFavoriteProject.findMany({
			where: {
				projectId: projectId,
			}
		})
	}

	async unsubProject(data: IUnsubscribeOnProjectDto): Promise<void> {
		await this.prisma.userFavoriteProject.delete({
			where: {
				userId_projectId: {
					userId: data.userId,
					projectId: data.projectId
				}
			}
		});
	}
}
