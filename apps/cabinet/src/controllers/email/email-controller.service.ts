import { Injectable } from '@nestjs/common';
import { EmailService } from 'libs/services/email/email.service';
import {
  MessageHtmlDto,
  MessageTextDto,
} from 'apps/cabinet/src/controllers/email/dto/message.dto';
import { ResSentMessageDto } from 'apps/cabinet/src/controllers/email/dto/res-dto/res-sent-message.dto';
import { ResConfirmDto } from 'apps/cabinet/src/controllers/email/dto/res-dto/res-confirm.dto';

@Injectable()
export class EmailControllerService {
  constructor(private readonly emailService: EmailService) {}

  sentMessage(message: MessageTextDto): Promise<ResSentMessageDto> {
    return this.emailService.sentMessage(message);
  }

  confirmAction(message: MessageHtmlDto): Promise<ResConfirmDto> {
    return this.emailService.confirmAction(message);
  }
}
