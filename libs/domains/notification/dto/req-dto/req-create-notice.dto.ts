import { NotifacationStatus } from '@prisma/client';

export interface IReqCreateNoticeDto {
  senderId: number;
  recipientId: number;
  status: NotifacationStatus;
  visible: boolean;
}
