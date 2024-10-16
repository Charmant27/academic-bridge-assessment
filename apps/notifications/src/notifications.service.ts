import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEMail({email}: NotifyEmailDto) {
    console.log(email)
  }
}
