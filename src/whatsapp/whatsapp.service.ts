import { Injectable } from '@nestjs/common';
import { WhatsappHelper } from './whatsapp.helper';

@Injectable()
export class WhatsappService {
  constructor(private readonly whatsappHelper: WhatsappHelper) {}

  handleMessageFrom(phoneNumberId: string, { messageId, from, message }) {
    const msg = this.whatsappHelper.textMessageFrom({
      to: from,
      text: 'ack ' + message,
      replyingMessageId: messageId,
    });
    this.whatsappHelper.send(msg, { phoneNumberId });
  }
}
