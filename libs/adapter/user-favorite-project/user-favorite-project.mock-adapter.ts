import { Injectable } from '@nestjs/common';
import { UserFavoriteProjectRepository } from '../../domains/user-favorite-project/repository/user-favorite-project.repository';
import { IGetSubsDto } from '../../domains/user-favorite-project/dto/res-dto/get-subs.dto';
import { ISubscribeOnProjectDto } from '../../domains/user-favorite-project/dto/req-dto/subscribe-on-project.dto';
import { IUnsubscribeOnProjectDto } from '../../domains/user-favorite-project/dto/req-dto/unsubscribe-on-project.dto';

@Injectable()
export class UserFavoriteProjectMockAdapter extends UserFavoriteProjectRepository {
  constructor() {
    super();
  }

  async subProject(data: ISubscribeOnProjectDto): Promise<void> {
    throw new Error(`${data.userId}, ${data.projectId}`);
  }

  async getSubsByUser(subscriberId: number): Promise<IGetSubsDto[]> {
    throw new Error(`${subscriberId}`);
  }

  async getSubsByProject(projectId: number): Promise<IGetSubsDto[]> {
    throw new Error(`${projectId}`);
  }

  async unsubProject(data: IUnsubscribeOnProjectDto): Promise<void> {
    throw new Error(`${data.userId}, ${data.projectId}`);
  }
}
