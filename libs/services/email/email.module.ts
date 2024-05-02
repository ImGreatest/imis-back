import { Module } from "@nestjs/common";
import { EmailService } from "libs/services/email/email.service";

@Module({
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}