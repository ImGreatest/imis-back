import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { emailConfig } from "config/config";
import { IMessageHtml, IMessageText } from "libs/services/email/interfaces/message.interface";
import { IConfirm } from "libs/services/email/interfaces/confirm.interface";

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		Logger.verbose(emailConfig.EmailFrom, emailConfig.EmailPass);

		this.transporter = nodemailer.createTransport({
				// mail.ru
				host: 'smtp.mail.ru',
				port: 465,
				secure: true, // true for 465, false for other ports
				auth: {
					user: emailConfig.EmailFrom,
					pass: emailConfig.EmailPass,
				}
			},
				{
					name: 'Экосистема IMIS',
					from: 'Экосистема IMIS <imis_letter_sendler@mail.ru>',
			}
		);
	}

	async sendMessage(message: IMessageText) {
		console.log(message.to, message.subject, message.text);
		this.transporter.sendMail(message, (err: Error) => {
			if (err) return Logger.verbose(err);
		})
	}

	async confirmAction(message: IMessageHtml): Promise<IConfirm> {
		Logger.verbose("confirmAction", message);

		this.transporter.sendMail(message, (err: Error) => {
			if (err) return Logger.verbose(err);
		});

		return {
			access: Math.floor(100000 + Math.random() * 900000)
		}
	};
}