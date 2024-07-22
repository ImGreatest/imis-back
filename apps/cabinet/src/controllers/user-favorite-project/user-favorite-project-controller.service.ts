import { Injectable } from '@nestjs/common';
import { UserFavoriteProjectService } from '../../../../../libs/domains/user-favorite-project/user-favorite-project.service';
import { ResGetSubsDto } from './dto/res-dto/res-get-subs.dto';
import { ReqUnsubscribeOnProjectDto } from './dto/req-dto/req-unsubscribe-on-project.dto';
import { ReqSubscribeOnProjectDto } from './dto/req-dto/req-subscribe-on-project.dto';

@Injectable()
export class UserFavoriteProjectControllerService {
  constructor(private userFavorPrjService: UserFavoriteProjectService) {}

  subProject(data: ReqSubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.subProject(data);
  }

  getSubsByUser(userId: number): Promise<ResGetSubsDto[]> {
    return this.userFavorPrjService.getSubsByUser(userId);
  }

  getSubsByProject(projectId: number): Promise<ResGetSubsDto[]> {
    return this.userFavorPrjService.getSubsByProject(projectId);
  }

  unsubProject(data: ReqUnsubscribeOnProjectDto): Promise<void> {
    return this.userFavorPrjService.unsubProject(data);
  }
}
