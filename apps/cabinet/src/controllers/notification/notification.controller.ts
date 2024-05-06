import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
	NotificationControllerService
} from "apps/cabinet/src/controllers/notification/notification-controller.service";
import { ReqCreateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-create-notice.dto";
import { ResNoticeDto } from "apps/cabinet/src/controllers/notification/dto/res-dto/res-notice.dto";
import { ReqUpdateNoticeDto } from "apps/cabinet/src/controllers/notification/dto/req-dto/req-update-notice.dto";
import { Public } from "libs/decorators/public.decorator";
import { NotifacationStatus } from "@prisma/client";

@ApiTags('notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationControllerService) {}

	@Public()
	@Post('create-notice')
	@ApiBody({ type: ReqCreateNoticeDto })
	createNotice(@Body() data: ReqCreateNoticeDto): Promise<ResNoticeDto> {
		return this.notificationService.createNotice(data);
	}

	@Get('get-current/:id')
	@ApiParam({
		name: 'id',
		description: 'Id notice',
		required: true,
		example: 1
	})
	getCurrent(@Param('id') id: number): Promise<ResNoticeDto> {
		return this.notificationService.getCurrent(id);
	}

	@Get('get-by-sender/:id')
	@ApiParam({
		name: 'id',
		required: true,
		example: 1,
	})
	@ApiQuery({
		name: 'date',
		description: 'zerous is **_required_**',
		required: false,
		example: new Date().toISOString().slice(0, 10),
	})
	@ApiQuery({
		name: 'visible',
		required: false,
		example: true,
	})
	getBySender(
		@Param('id') id: number,
		@Query('date') date?: string,
		@Query('visible') visible?: boolean
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySender(id, date, visible);
	}

	@Get('get-by-recipient/:id')
	@ApiParam({
		name: 'id',
		required: true,
		example: 1
	})
	@ApiQuery({
		name: 'date',
		description: 'zerous is **_required_**',
		required: false,
		example: new Date().toISOString().slice(0, 10)
	})
	@ApiQuery({
		name: 'visible',
		required: false,
		example: true
	})
	getByRecipient(
		@Param('id') id: number,
		@Query('date') date: string,
		@Query('visible') visible: boolean
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getByRecipient(id, date, visible);
	}

	@Get('get-by-status/:status')
	@ApiParam({
		name: 'status',
		required: true,
		enum: NotifacationStatus,
		example: NotifacationStatus.unread,
	})
	@ApiQuery({
		name: 'date',
		description: 'zeroes is **_required_**',
		required: false,
		example: new Date().toISOString().slice(0, 10)
	})
	@ApiQuery({
		name: 'visible',
		required: false,
		example: true
	})
	getByStatus(
		@Param('status') status: NotifacationStatus,
		@Query('date') date: string,
		@Query('visible') visible: boolean
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getByStatus(status, date, visible);
	}

	@Get('get-by-time/:date')
	@ApiParam({
		name: 'date',
		description: 'zeroes is **_required_**',
		required: false,
		example: new Date().toISOString().slice(0, 10)
	})
	@ApiQuery({
		name: 'visible',
		required: false,
		example: true
	})
	getByTime(
		@Param('date') date: string,
		@Query('visible') visible: boolean
	): Promise<ResNoticeDto[]> {
		console.log(date, visible);
		return this.notificationService.getByTime(date, visible);
	}

	@Get('get-by-sender-and-recipient/:sender')
	@ApiParam({
		name: 'sender',
		required: true,
		example: 1
	})
	@ApiQuery({
		name: 'recipient',
		required: true,
		example: 1
	})
	@ApiQuery({
		name: 'date',
		description: 'zeroes is **_required_**',
		required: false,
		example: new Date().toISOString().slice(0, 10)
	})
	@ApiQuery({
		name: 'visible',
		required: false,
		example: true
	})
	getBySenderRecipient(
		@Param('sender') senderId: number,
		@Query('recipient') recipientId: number,
		@Query('date') date: string,
		@Query('visible') visible: boolean
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getBySenderAndRecipient(senderId, recipientId, date, visible);
	}

	@Get('get-by-visible/:visible')
	@ApiParam({
		name: 'visible',
		description: 'Filter visible notifications',
		required: true,
		example: true
	})
	@ApiQuery({
		name: 'date',
		description: 'Helps to use filter on notices => type input(year-month-day) - **_zeroes required_**',
		required: false,
		example: '2024-05-06'
	})
	getByVisible(
		@Param('visible') visible: boolean,
		@Query('date') date: string,
	): Promise<ResNoticeDto[]> {
		return this.notificationService.getByVisible(visible, date);
	}

	@Put('change-status/:id')
	@Public()
	@ApiQuery({
		name: 'status',
		enum: NotifacationStatus,
		required: true,
		example: NotifacationStatus.unread,
	})
	changeStatus(
		@Param('id') id: number,
		@Query('status') status: NotifacationStatus
	): Promise<void> {
		return this.notificationService.changeStatus(id, status);
	}

	@Put('change-visible/:id')
	changeVisible(
		@Param('id') id: number,
		@Query('visible') visible: boolean
	): Promise<void> {
		return this.notificationService.changeVisible(id, visible);
	}

	@Put('update-notice/:id')
	@Public()
	@ApiBody({ type: ReqUpdateNoticeDto })
	updateNotice(
		@Param('id') id: number,
		@Body() data: ReqUpdateNoticeDto
	): Promise<void> {
		return this.notificationService.updateNotice(id, data);
	}

	@Delete('delete-notice/:id')
	@Public()
	deleteNotice(@Param('id') id: number): Promise<void> {
		return this.notificationService.deleteNotice(id);
	}
}
