import { Injectable, Logger } from '@nestjs/common';
import { NotificationRepository } from 'libs/domains/notification/repositories/notification.repository';
import { IReqCreateNoticeDto } from 'libs/domains/notification/dto/req-dto/req-create-notice.dto';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { IReqUpdateNoticeDto } from 'libs/domains/notification/dto/req-dto/req-update-notice.dto';
import { IResNoticeDto } from 'libs/domains/notification/dto/res-dto/res-notice.dto';
import { BackendExceptions } from '../../exceptions/backend.exceptions';
import { EErrorCode } from '../../exceptions/enums/error-code.enum';
import { NotifacationStatus } from '@prisma/client';

@Injectable()
export class NotificationAdapter extends NotificationRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  checkDateTime(notices: IResNoticeDto[], dateTime: string): IResNoticeDto[] {
    return notices.filter((notice) => {
      const noticeDate: Date = new Date(notice.dateTimeSent);
      const filterDate: Date = new Date(dateTime);
      return noticeDate
        .toISOString()
        .startsWith(filterDate.toISOString().slice(0, 10));
    });
  }

  async createNotice(data: IReqCreateNoticeDto): Promise<IResNoticeDto> {
    Logger.verbose('createNotice', { ...data });

    return this.prisma.notifacation.create({
      data: {
        senderId: data.senderId,
        recipientId: data.recipientId,
        dateTimeSent: new Date().toISOString(),
        status: data.status,
        visible: data.visible,
      },
    });
  }

  async getCurrent(id: number): Promise<IResNoticeDto> {
    Logger.verbose('getCurrent', id);

    const notice: IResNoticeDto = await this.prisma.notifacation.findUnique({
      where: {
        id: id,
      },
    });

    if (!notice) {
      throw new BackendExceptions(EErrorCode.NotFound, {
        messageDebug: `Notice with id=${id} is not found!`,
        messageUI: 'Notice not found!',
      });
    }

    return notice;
  }

  async getBySender(
    id: number,
    date: string,
    visible: boolean,
  ): Promise<IResNoticeDto[]> {
    console.log(id, date, visible);
    Logger.verbose('getBySender', id, date, visible);

    let notices: IResNoticeDto[] = await this.prisma.notifacation.findMany({
      where: {
        senderId: id,
        visible: visible,
      },
    });

    if (!notices) {
      throw new Error('Notices is not found');
    }

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async getByRecipient(
    id: number,
    date: string,
    visible: boolean,
  ): Promise<IResNoticeDto[]> {
    Logger.verbose('getByRecipient', id, date, visible);

    let notices = await this.prisma.notifacation.findMany({
      where: {
        recipientId: id,
        visible: visible,
      },
    });

    if (!notices) {
      throw new BackendExceptions(EErrorCode.NotFound, {
        messageDebug: 'Notices is not found!',
      });
    }

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async getByStatus(
    status: NotifacationStatus,
    date: string,
    visible: boolean,
  ): Promise<IResNoticeDto[]> {
    Logger.verbose('getByStatus', status, date, visible);

    let notices = await this.prisma.notifacation.findMany({
      where: {
        status: status,
        visible: visible,
      },
    });

    if (!notices) {
      throw new BackendExceptions(EErrorCode.NotFound, {
        messageDebug: 'Notices is not found with this status!',
      });
    }

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async getByTime(date: string, visible?: boolean): Promise<IResNoticeDto[]> {
    Logger.verbose('getByTime', date, visible);

    let notices = await this.prisma.notifacation.findMany({
      where: {
        visible: visible,
      },
    });

    if (!notices) {
      throw new BackendExceptions(EErrorCode.NotFound, {
        messageDebug: 'Notices is not found with this time!',
      });
    }

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async getBySenderAndRecipient(
    senderId: number,
    recipientId: number,
    date: string,
    visible: boolean,
  ): Promise<IResNoticeDto[]> {
    Logger.verbose(
      'getBySenderAndRecipient',
      senderId,
      recipientId,
      date,
      visible,
    );

    let notices: IResNoticeDto[] = await this.prisma.notifacation.findMany({
      where: {
        senderId: senderId,
        recipientId: recipientId,
        visible: visible,
      },
    });

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async getByVisible(
    visible: boolean,
    date?: string,
  ): Promise<IResNoticeDto[]> {
    Logger.verbose('getByVisible', visible);

    let notices: IResNoticeDto[] = await this.prisma.notifacation.findMany({
      where: {
        visible: visible,
      },
    });

    Logger.verbose('getByVisible', notices);

    if (date) {
      notices = this.checkDateTime(notices, date);
    }

    return notices;
  }

  async changeStatus(id: number, status: NotifacationStatus): Promise<void> {
    Logger.verbose('changeStatus', id, status);

    await this.prisma.notifacation.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }

  async changeVisible(id: number, visible: boolean): Promise<void> {
    Logger.verbose('changeVisible', id, visible);

    await this.prisma.notifacation.update({
      where: {
        id: id,
      },
      data: {
        visible: visible,
      },
    });
  }

  async updateNotice(id: number, data: IReqUpdateNoticeDto): Promise<void> {
    Logger.verbose('updateNotice', id, { ...data });

    await this.prisma.notifacation.update({
      where: {
        id: id,
      },
      data: {
        senderId: data.senderId,
        recipientId: data.recipientId,
        status: data.status,
        visible: data.visible,
      },
    });
  }

  async deleteNotice(id: number): Promise<void> {
    Logger.verbose('deleteNotice', id);

    await this.prisma.notifacation.delete({
      where: {
        id: id,
      },
    });
  }
}
