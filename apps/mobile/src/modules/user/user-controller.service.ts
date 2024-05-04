import { Injectable } from '@nestjs/common';
import { IReqUpdateUser } from 'libs/domains/user/dto/req-dto/req-update-user.interface.dto';
import { IResUser } from 'libs/domains/user/dto/res-dto/res-user.dto';
import { UserService } from 'libs/domains/user/user.service';

@Injectable()
export class UsersService {
    constructor(private userServise: UserService) {}


    updateUser(id: number, user: IReqUpdateUser): Promise<IResUser> {
        return this.userServise.updateUser(id, user);
      }

}
