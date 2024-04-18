import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domains/user/repositories/user.repository";
import { IReqCreateUser } from "../../domains/user/dto/req-dto/req-create-user.interface.dto";
import { IResUser } from "../../domains/user/dto/res-dto/res-user.dto";
import { PrismaService } from "../../services/prisma/prisma.service";
import { IResGetUserAndCountDto } from "../../domains/user/dto/res-dto/res-get-user-and-count.dto";
import { User } from "../../entity/user";
import { IReqUpdateUser } from "../../domains/user/dto/req-dto/req-update-user.interface.dto";

@Injectable()
export class UserAdapter extends UserRepository {
	constructor(private prisma: PrismaService) {
		super();
	}

	async createUser(user: IReqCreateUser): Promise<IResUser> {
		return this.prisma.user.create({
      data: user,
    });
	}

	async getUserAndCount(): Promise<IResGetUserAndCountDto> {
		const users: User[] = await this.prisma.user.findMany();
    const totalCount: number = await this.prisma.user.count();

    if (!users)
      throw new Error();

    return {
      rows: users,
      count: totalCount,
    };
	}

	async getUserByEmail(email: string): Promise<IResUser> {
		const user = this.prisma.user.findFirst({
      where: { email: email }
    });

    if (!user)
      throw new Error();

    return user;
	}

	async getUserById(id: number): Promise<IResUser> {
		const user = this.prisma.user.findFirst({
      where: { id: id }
    });

    if (!user)
      throw new Error();

    return user;
	}

	async getUsers(): Promise<IResUser[]> {
		const users = this.prisma.user.findMany({
      where: { deletedAt: null }
    });

    if (!users)
      throw new Error();

    return users;
	}

	async updateUser(id: number, user: IReqUpdateUser): Promise<IResUser> {
		return this.prisma.user.update({
      where: {id: id},
      data: user,
    });
	}

	async deleteUser(id: number): Promise<IResUser> {
		return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
	}
}
