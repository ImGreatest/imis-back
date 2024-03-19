


export class ResUserDto {
    id!: number;
    email!: string;
    name!: string;
    surname!: string;
    pass!: string;
    course!: number;
    direction!: string;
    group!: string;
    createdAt!: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    roleId!: number;
}
