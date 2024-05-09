import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { EmailControllerService } from 'apps/cabinet/src/controllers/email/email-controller.service';
import { Public } from 'libs/decorators/public.decorator';
import {
  MessageHtmlDto,
  MessageTextDto,
} from 'apps/cabinet/src/controllers/email/dto/message.dto';
import { ResSentMessageDto } from 'apps/cabinet/src/controllers/email/dto/res-dto/res-sent-message.dto';
import { ResConfirmDto } from 'apps/cabinet/src/controllers/email/dto/res-dto/res-confirm.dto';

@ApiTags('email-service')
@Controller('email-service')
export class EmailController {
  constructor(private readonly emailService: EmailControllerService) {}

  @Public()
  @Post('sent-text-message')
  @ApiBody({ type: MessageTextDto })
  sentMessage(@Body() message: MessageTextDto): Promise<ResSentMessageDto> {
    Logger.verbose('sentMessage', message);
    return this.emailService.sentMessage(message);
  }

  @Public()
  @Post('sent-html-message')
  @ApiBody({ type: MessageHtmlDto })
  confirmAction(@Body() message: MessageHtmlDto): Promise<ResConfirmDto> {
    Logger.verbose('confirmAction', message.to, message.subject);
    return this.emailService.confirmAction(message);
  }
}
