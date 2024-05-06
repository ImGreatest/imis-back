import { NotifacationStatus } from '@prisma/client';

export interface IResNoticeDto {
  id: number;
  senderId: number;
  recipientId: number;
  status: NotifacationStatus;
  dateTimeSent: Date;
  visible: boolean;
}
