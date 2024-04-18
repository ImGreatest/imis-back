import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domains/user/repositories/user.repository";
import { IReqCreateUser } from "../../domains/user/dto/req-dto/req-create-user.interface.dto";
import { IResUser } from "../../domains/user/dto/res-dto/res-user.dto";
import { IResGetUserAndCountDto } from "../../domains/user/dto/res-dto/res-get-user-and-count.dto";
import { IReqUpdateUser } from "../../domains/user/dto/req-dto/req-update-user.interface.dto";

@Injectable()
export class UserMockAdapter extends UserRepository {
    constructor() {
        super();
    }

    async createUser(user: IReqCreateUser): Promise<IResUser> {
        throw new Error(`${user}`);
    }

    async getUserAndCount(): Promise<IResGetUserAndCountDto> {
        throw new Error();
    }

    async getUserByEmail(email: string): Promise<IResUser> {
        throw new Error(`${email}`);
    }

    async getUserById(id: number): Promise<IResUser> {
        throw new Error(`${id}`);
    }

    async getUsers(): Promise<IResUser[]> {
        throw new Error();
    }

    async updateUser(id: number, user: IReqUpdateUser): Promise<IResUser> {
        throw new Error(`${id}, ${user}`);
    }

    async deleteUser(id: number): Promise<IResUser> {
        throw new Error(`${id}`);
    }
}