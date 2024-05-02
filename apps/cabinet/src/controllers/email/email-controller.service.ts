import { Injectable } from "@nestjs/common";
import { EmailService } from "libs/services/email/email.service";

@Injectable()
export class EmailControllerService {
	constructor(private readonly emailService: EmailService) {}

	sentMessage(to: string) {
		return this.emailService.sendMail(to);
	}
}