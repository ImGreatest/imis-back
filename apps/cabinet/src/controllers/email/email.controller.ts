import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Logger } from "@nestjs/common";
import { EmailControllerService } from "apps/cabinet/src/controllers/email/email-controller.service";
import { Public } from 'libs/decorators/public.decorator';
import { IMessageHtmlDto, IMessageTextDto } from "apps/cabinet/src/controllers/email/dto/message.dto";
import { IConfirmDto } from "apps/cabinet/src/controllers/email/dto/confirm.dto";

@ApiTags('email-service')
@Controller('email-service')
export class EmailController {
	constructor(private readonly emailService: EmailControllerService) {}

	@Public()
	@Post('sent-text-message')
	sentMessage(@Body() message: IMessageTextDto): Promise<void> {
		Logger.verbose("sentMessage", message);
		return this.emailService.sentMessage(message);
	}

	@Public()
	@Post('sent-confirm-message')
	sentConfirmActionMessage(@Body() message: IMessageHtmlDto): Promise<IConfirmDto> {
		return this.emailService.sentConfirmActionMessage(message);
	}
}