import { Injectable } from "@nestjs/common";
import { IResGetSubscribesDto } from "../dto/res-dto/res-get-subscribes.dto";
import { IReqSubscribeOnUserDto } from "../dto/req-dto/req-subscribe-on-user.dto";
import { IReqUnsubscribeOnUserDto } from "../dto/req-dto/req-unsubscribe-on-user.dto";

@Injectable()
export abstract class UserFavoriteUserRepository {
	abstract subUser(data: IReqSubscribeOnUserDto): Promise<void>;

	abstract getSubsUser(ownerId: number): Promise<IResGetSubscribesDto[]>;

	abstract unsubUser(data: IReqUnsubscribeOnUserDto): Promise<void>;
}