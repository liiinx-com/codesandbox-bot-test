import { Injectable } from '@nestjs/common';
import { WhatsappHelper } from './whatsapp.helper';

@Injectable()
export class WhatsappService {
  constructor(private readonly whatsappHelper: WhatsappHelper) {}

  handleMessageFrom(phoneNumberId: string, { from, msg }) {
    const data = { /*type: 'text',*/ to: from, text: { body: 'vika' + msg } };
    this.whatsappHelper.send(data, { phoneNumberId });
  }
}
