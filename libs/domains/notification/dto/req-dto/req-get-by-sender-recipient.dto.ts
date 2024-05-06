export interface IReqGetBySenderRecipientDto {
	senderId: number;
	recipientId: number;
	dateTimeSent?: Date;
	visible?: boolean;
}
