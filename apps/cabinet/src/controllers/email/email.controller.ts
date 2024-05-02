import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { EmailControllerService } from "apps/cabinet/src/controllers/email/email-controller.service";
import { Public } from 'libs/decorators/public.decorator';

@ApiTags('email-service')
@Controller('email-service')
export class EmailController {
	constructor(private readonly emailService: EmailControllerService) {}

	@Public()
	@Get('sent-message')
	sentMail(@Param('to') to: string) {
		return this.emailService.sentMessage(to);
	}
}