import { Injectable } from "@nestjs/common";
import {
	UserFavoriteEventRepository
} from "../../domains/user-favorite-event/repositories/user-favorite-event.repository";
import { PrismaService } from "../../services/prisma/prisma.service";
import { IReqSubscribeOnEventDto } from "../../domains/user-favorite-event/dto/req-dto/req-subscribe-on-event.dto";
import { IReqUnsubscribeOnEventDto } from "../../domains/user-favorite-event/dto/req-dto/req-unsubscribe-on-event.dto";
import { IResGetSubscribesDto } from "../../domains/user-favorite-event/dto/res-dto/res-get-subscribes.dto";

@Injectable()
export class UserFavoriteEventAdapter extends UserFavoriteEventRepository {
	constructor(private prisma: PrismaService) {
		super();
	}

	async subEvent(data: IReqSubscribeOnEventDto): Promise<void> {
		await this.prisma.favoriteEvent.create({
			data: {
				userId: data.userId,
				eventId: data.eventId
			}
		});
	}

	async getSubsUser(userId: number): Promise<IResGetSubscribesDto[]> {
		return this.prisma.favoriteEvent.findMany({
			where: {
				userId: userId
			}
		});
	}

	async unsubEvent(data: IReqUnsubscribeOnEventDto): Promise<void> {
		await this.prisma.favoriteEvent.delete({
			where: {
				userId_eventId: {
					userId: data.userId,
					eventId: data.eventId
				}
			}
		});
	}
}