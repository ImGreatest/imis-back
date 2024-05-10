import { Injectable } from "@nestjs/common";
import { UserFavoriteUserRepository } from "../../domains/user-favorite-user/repository/user-favorite-user.repository";
import { IReqSubscribeOnUserDto } from "../../domains/user-favorite-user/dto/req-dto/req-subscribe-on-user.dto";
import { IResGetSubscribesDto } from "../../domains/user-favorite-user/dto/res-dto/res-get-subscribes.dto";
import { IReqUnsubscribeOnUserDto } from "../../domains/user-favorite-user/dto/req-dto/req-unsubscribe-on-user.dto";

@Injectable()
export class UserFavoriteUserMockAdapter extends UserFavoriteUserRepository {
	constructor() {
		super();
	}

	async subUser(data: IReqSubscribeOnUserDto): Promise<void> {
		throw new Error(`${data}`);
	}

	async getSubsUser(ownerId: number): Promise<IResGetSubscribesDto[]> {
		throw new Error(`${ownerId}`);
	}

	async unsubUser(data: IReqUnsubscribeOnUserDto): Promise<void> {
		throw new Error(`${data}`);
	}
}
