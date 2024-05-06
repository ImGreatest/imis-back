import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import {
	NotificationControllerService
} from "apps/cabinet/src/controllers/notification/notification-controller.service";
import { ReqCreateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-create-notice.dto";
import { ResNoticeDto } from "apps/cabinet/src/controllers/notification/dto/res-dto/res-notice.dto";
import { ReqGetCurrentDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-current.dto";
import { ReqGetBySenderDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-sender.dto";
import { ReqGetByRecipientDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-recipient.dto";
import { ReqGetByStatusDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-status.dto";
import { ReqGetByTimeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-time.dto";
import {
	ReqGetBySenderRecipientDto
} from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-sender-recipient.dto";
import { ReqUpdateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-update-notice.dto";
import { ReqDeleteNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-delete-notice.dto";
import { ReqGetByVisibleDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-get-by-visible.dto";
import { Public } from "libs/decorators/public.decorator";

@ApiTags('notification')
// @ApiBearerAuth()
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationControllerService) {}

	@Public()
	@Post('create-notice')
	@ApiBody({ type: ReqCreateNoticeDto })
	createNotice(@Body() data: ReqCreateNoticeDto): Promise<ResNoticeDto> {
		Logger.verbose('createNotice', data.status);
		return this.notificationService.createNotice(data);
	}

	@Get('get-current')
	@ApiBody({ type: ReqGetCurrentDto })
	getCurrent(@Body() data: ReqGetCurrentDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getCurrent(data);
	}

	@Get('get-by-sender')
	@ApiBody({ type: ReqGetBySenderDto })
	getBySender(@Body() data: ReqGetBySenderDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySender(data);
	}

	@Get('get-by-recipient')
	@ApiBody({ type: ReqGetByRecipientDto })
	getByRecipient(@Body() data: ReqGetByRecipientDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByRecipient(data);
	}

	@Get('get-by-status')
	@ApiBody({ type: ReqGetByStatusDto })
	getByStatus(@Body() data: ReqGetByStatusDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByStatus(data);
	}

	@Get('get-by-time')
	@ApiBody({ type: ReqGetByTimeDto })
	getByTime(@Body() data: ReqGetByTimeDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByTime(data);
	}

	@Get('get-by-sender-and-recipient')
	@ApiBody({ type: ReqGetBySenderRecipientDto })
	getBySenderRecipient(@Body() data: ReqGetBySenderRecipientDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySenderAndRecipient(data);
	}

	@Get('get-by-visible')
	@ApiBody({ type: ReqGetByVisibleDto })
	getByVisible(@Body() data: ReqGetByVisibleDto): Promise<ResNoticeDto[]> {
		return this.notificationService.getByVisible(data);
	}

	@Put('change-visible')
	changeVisible(
		@Param('id') id: number,
		@Param('visible') visible: boolean
	): Promise<void> {
		return this.notificationService.changeVisible(id, visible);
	}

	@Put('update-notice')
	@ApiBody({ type: ReqUpdateNoticeDto })
	updateNotice(
		@Param('id') id: number,
		@Body() data: ReqUpdateNoticeDto
	): Promise<void> {
		return this.notificationService.updateNotice(id, data);
	}

	@Delete('delete-notice')
	@ApiBody({ type: ReqDeleteNoticeDto })
	deleteNotice(@Body() data: ReqDeleteNoticeDto): Promise<void> {
		return this.notificationService.deleteNotice(data);
	}
}
