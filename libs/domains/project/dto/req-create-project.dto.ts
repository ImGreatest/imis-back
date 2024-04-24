// id Int @default(autoincrement()) @id
// name String @unique @db.VarChar()
//
// createdAt  DateTime   @default(now())
// updatedAt  DateTime   @updatedAt
// deletedAt DateTime? @db.Timestamp()
// 	status String @db.VarChar()
// descripton String @db.VarChar()
// creater User @relation(fields: [createrId],references: [id])
// createrId Int @db.Integer
// projectSkils ProjectSkils[]
// users UserProject[]
// usersWithFavor UserFavoritProject[]

import { User } from "../../user/entities/user";

export interface IReqCreateProjectDto {
    name: string;
    status: string;
    description: string;
    creater: User;

}