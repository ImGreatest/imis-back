import { Injectable } from "@nestjs/common";
import { IReqSubscribeOnEventDto } from "../dto/req-dto/req-subscribe-on-event.dto";
import { IResGetSubscribesDto } from "../dto/res-dto/res-get-subscribes.dto";
import { IReqUnsubscribeOnEventDto } from "../dto/req-dto/req-unsubscribe-on-event.dto";

@Injectable()
export abstract class UserFavoriteEventRepository {
	abstract subEvent(data: IReqSubscribeOnEventDto): Promise<void>;

	abstract getSubsUser(userId: number): Promise<IResGetSubscribesDto[]>;

	abstract unsubEvent(data: IReqUnsubscribeOnEventDto): Promise<void>;
}
