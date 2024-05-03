import { Injectable } from "@nestjs/common";
import { EmailService } from "libs/services/email/email.service";
import { IMessageHtmlDto, IMessageTextDto } from "apps/cabinet/src/controllers/email/dto/message.dto";
import { IConfirmDto } from "apps/cabinet/src/controllers/email/dto/confirm.dto";

@Injectable()
export class EmailControllerService {
	constructor(private readonly emailService: EmailService) {}

	sentMessage(message: IMessageTextDto): Promise<void> {
		return this.emailService.sendMessage(message);
	}

	sentConfirmActionMessage(message: IMessageHtmlDto): Promise<IConfirmDto> {
		return this.emailService.confirmAction(message);
	}
}