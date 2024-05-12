import { Injectable } from '@nestjs/common';
import { NotificationRepository } from 'libs/domains/notification/repositories/notification.repository';
import { IReqCreateNoticeDto } from 'libs/domains/notification/dto/req-dto/req-create-notice.dto';
import { IResNoticeDto } from 'libs/domains/notification/dto/res-dto/res-notice.dto';
import { IReqUpdateNoticeDto } from 'libs/domains/notification/dto/req-dto/req-update-notice.dto';
import { NotifacationStatus } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRep: NotificationRepository) {}

  async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
    return this.notificationRep.createNotice(data);
  }

  async getCurrent(id: number): Promise<IResNoticeDto> {
    return this.notificationRep.getCurrent(id);
  }

  async getBySender(id: number, visible?: boolean): Promise<IResNoticeDto[]> {
    return this.notificationRep.getBySender(id, visible);
  }

  async getByRecipient(
    id: number,
    visible?: boolean,
  ): Promise<IResNoticeDto[]> {
    return this.notificationRep.getByRecipient(id, visible);
  }

  async getByStatus(
    status: NotifacationStatus,
    visible?: boolean,
  ): Promise<IResNoticeDto[]> {
    return this.notificationRep.getByStatus(status, visible);
  }

  async getByTime(date: string, visible?: boolean): Promise<IResNoticeDto[]> {
    return this.notificationRep.getByTime(date, visible);
  }

  async getBySenderAndRecipient(
    senderId: number,
    recipientId: number,
    date: string,
    visible: boolean,
  ): Promise<IResNoticeDto[]> {
    return this.notificationRep.getBySenderAndRecipient(
      senderId,
      recipientId,
      date,
      visible,
    );
  }

  async getByVisible(
    visible: boolean,
    date?: string,
  ): Promise<IResNoticeDto[]> {
    return this.notificationRep.getByVisible(visible, date);
  }

  async changeStatus(id: number, status: NotifacationStatus): Promise<void> {
    return this.notificationRep.changeStatus(id, status);
  }

  async changeVisible(id: number, visible: boolean): Promise<void> {
    return this.notificationRep.changeVisible(id, visible);
  }

  async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
    return this.notificationRep.updateNotice(id, data);
  }

  async deleteNotice(id: number): Promise<void> {
    return this.notificationRep.deleteNotice(id);
  }
}
