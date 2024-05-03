import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { emailConfig } from "config/config";
import { IResMessageTextDto } from "libs/services/email/dto/res-message.dto";
import { IReqMessageHtmlDto, IReqMessageTextDto } from "libs/services/email/dto/req-message.dto";
import { IResConfirmDto } from "libs/services/email/dto/res-confirm.dto";

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
					// user: emailConfig.EmailFrom,
					// pass: emailConfig.EmailPass,
					user: 'imis_letter_sendler@mail.ru',
					pass: 'k8zm7RePucA0209QLymh'
				}
			},
				{
					name: 'Экосистема IMIS',
					from: 'Экосистема IMIS <imis_letter_sendler@mail.ru>',
			}
		);
	}

	async sentMessage(message: IReqMessageTextDto): Promise<IResMessageTextDto>  {
		try {
			await this.transporter.sendMail(message);

			return { state: true }
		} catch (err) {
			Logger.verbose("sentMessage error is ", err);

			return { state: false }
		}
	}

	async confirmAction(data: IReqMessageHtmlDto) {
		Logger.verbose("confirmAction", data.to, data.subject);
		try {
			const access: number = Math.floor(100000 + Math.random() * 900000);
			await this.transporter.sendMail({
				to: data.to,
				subject: data.subject,
				html: "<div style='display:flex;flex-direction: column;align-items:center;background:rgb(255,255,255)'><h2 style='margin-top:2rem;color:rgb(82,110,211)'>Экосистема IMIS</h2><h4 style='text-align: center;color:rgb(27,31,59,0.65)'>Ваш код доступа для смены пароля от учетной записи IMIS: "+ access +"</h4><div style='margin-bottom:2rem;background:rgb(250,249,250);border:1px solid rgb(218,216,222);padding:5px'><span style='font-size: 1.17rem;font-weight: bold;text-align: center;letter-spacing: 0.35rem;color:rgb(50,47,55)'>"+ access +"</span></div></div>"
			});

		} catch (err) {
			Logger.verbose("confirmAction error is ", err);

			return ;
		}
	};
}