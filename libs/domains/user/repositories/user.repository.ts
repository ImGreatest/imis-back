import { Injectable } from "@nestjs/common";
import { IReqCreateUser } from "../dto/req-dto/req-create-user.interface.dto";
import { IResUser } from "../dto/res-dto/res-user.dto";
import { IReqUpdateUser } from "../dto/req-dto/req-update-user.interface.dto";
import { IResGetUserAndCountDto } from "../dto/res-dto/res-get-user-and-count.dto";

@Injectable()
export abstract class UserRepository {
    abstract createUser(user: IReqCreateUser): Promise<IResUser>;

    abstract getUserAndCount(): Promise<IResGetUserAndCountDto>;

    abstract getUserByEmail(email: string): Promise<IResUser>;

    abstract getUserById(id: number): Promise<IResUser>;

    abstract getUsers(): Promise<IResUser[]>;

    abstract updateUser(id: number, user: IReqUpdateUser): Promise<IResUser>;

    abstract deleteUser(id: number): Promise<IResUser>;
}