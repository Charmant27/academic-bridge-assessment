import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer'

@Controller()
export class NotificationsController {
  // constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  async sendEmail(data: { to: string, subject: string, text: string, html: string}) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    })
  }
}