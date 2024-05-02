import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { transport } from "winston";

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465
			auth: {
				user: 'ardella45@ethereal.email',
				pass: 'KSbTKwtVZppk6nZkQE'
			}
		},
			{
			from: 'mailer test <ardella45@ethereal.email>',
		}
		);
	}

	async sendMail(to: string) {
		console.log(to);
		Logger.verbose("sendMail", to);

		const message = {
			to: 'ardella45@ethereal.email',
			subject: 'COngratilation!!!',
			text: "ПОздравляю нахуй"
		}

		this.transporter.sendMail(message, (err, info) => {
			if (err) return console.log(err);
			console.log("email sent", info);
		})
	}
}