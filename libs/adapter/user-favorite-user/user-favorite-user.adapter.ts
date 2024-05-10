import { Injectable } from '@nestjs/common';
import { UserFavoriteUserRepository } from '../../domains/user-favorite-user/repository/user-favorite-user.repository';
import { PrismaService } from '../../services/prisma/prisma.service';
import { IReqSubscribeOnUserDto } from '../../domains/user-favorite-user/dto/req-dto/req-subscribe-on-user.dto';
import { IReqUnsubscribeOnUserDto } from '../../domains/user-favorite-user/dto/req-dto/req-unsubscribe-on-user.dto';
import { IResGetSubscribesDto } from '../../domains/user-favorite-user/dto/res-dto/res-get-subscribes.dto';

@Injectable()
export class UserFavoriteUserAdapter extends UserFavoriteUserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async subUser(data: IReqSubscribeOnUserDto) {
    await this.prisma.favoriteUser.create({
      data: {
        favoriteId: data.favoriteId,
        ownerId: data.ownerId,
      },
    });
  }

  async getSubsUser(ownerId: number): Promise<IResGetSubscribesDto[]> {
    return this.prisma.favoriteUser.findMany({
      where: {
        ownerId: ownerId,
      },
    });
  }

  async unsubUser(data: IReqUnsubscribeOnUserDto): Promise<void> {
    await this.prisma.favoriteUser.delete({
      where: {
        favoriteId_ownerId: {
          favoriteId: data.favoriteId,
          ownerId: data.ownerId,
        },
      },
    });
  }
}
