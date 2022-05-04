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
		await transport.sendMail({
			from: 'Feedget team <hello@feedget.tld>',
			to: 'Site Owner <owner@feedget.tld>',
			subject,
			html: body,
		});
	}
}
