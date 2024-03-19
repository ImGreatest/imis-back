import { InjectRepository } from '@nestjs/typeorm';
import {User} from "../../../../../libs/entity/user";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {ReqCreateUserDto} from "./req-dto/req-create-user.dto";
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import {ResUserDto} from "../../../../../libs/res-dto/res-user.dto";



@Injectable()
export class UserService {
    private config: ConfigService;
    constructor(
        @InjectRepository(User)
        private userRep: Repository<User>,
        config: ConfigService,
    ) {
        this.config = config;
    }

    async getUser(id: number): Promise<ResUserDto> {
        const user = await this.userRep.findOneBy({id});
        if (user) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                pass: user.pass,
                course: user.course,
                direction: user.direction,
                group: user.group,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                deletedAt: user.deletedAt,
                roleId: user.roleId,
            }
        }
    }

    async createUser(data: ReqCreateUserDto): Promise<void> {
        const user: User | null = await this.userRep.findOne({
            where: [{ email: data.email }],
        });

        if (!user) {
            await this.userRep.save({
            ...data,
            pass: bcrypt.hashSync(data.password, this.config.getOrThrow(String(Number(process.env._HASH_SALT_ROUND) || 10))),
            });
        }
    }

    async removeUser(userId: number): Promise<void> {
        await this.userRep.softDelete(userId);
    }
}
