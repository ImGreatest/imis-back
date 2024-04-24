import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ReqCreateUserDto } from "./req-create-user.dto";

// export class ReqUpdateUserDto {
// 	@ApiProperty()
// 	@IsString()
// 	email!: string;
//
// 	@ApiProperty()
// 	@IsString()
// 	name!: string;
//
// 	@ApiProperty()
// 	@IsString()
// 	surname!: string;
// }

export class ReqUpdateUserDto extends ReqCreateUserDto {}
