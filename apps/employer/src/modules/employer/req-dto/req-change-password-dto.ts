import { IsString, MaxLength } from "class-validator";

export class ReqChangePasswordDto {
    @IsString()
    @MaxLength(255)
    Oldpassword!: string;

    @IsString()
    @MaxLength(255)
    newPassword!: string;
}