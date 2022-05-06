import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
require('dotenv').config();

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
	host: String(process.env.SMTP_HOST) || 'localhost',
	port: Number(process.env.SMTP_PORT) || 25,
	auth: {
		user: String(process.env.SMTP_USER) || '',
		pass: String(process.env.SMTP_PASS) || '',
	},
} as SMTPTransport.Options);

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ body, subject }: SendMailData) {
		if (
			process.env.SMTP_HOST !== undefined &&
			process.env.SMTP_HOST?.length > 0
		) {
			await transport.sendMail({
				from: String(process.env.SMTP_FROM),
				to: String(process.env.SMTP_TO),
				subject,
				html: body,
			});
		}
	}
}
