import { Injectable } from '@nestjs/common';
import { WhatsappHelper } from './whatsapp.helper';
import { WhatsappMessageHandler } from './whatsapp.message-handler.service';

@Injectable()
export class WhatsappService {
  constructor(
    private readonly whatsappHelper: WhatsappHelper,
    private readonly messageHandler: WhatsappMessageHandler,
  ) {}

  getMessageHandler(message: string) {
    const messageRepository = {
      hi: this.messageHandler.hi,
      menu: this.messageHandler.generalMenu,
    };

    const handler = messageRepository[message]
      ? messageRepository[message]
      : messageRepository.hi;
    return handler;
  }

  async handleMessageFrom(phoneNumberId: string, { messageId, from, message }) {
    const cleanMessage = this.whatsappHelper.cleanMessage(message);

    const messageHandler = this.getMessageHandler(cleanMessage);
    const params: any = {};
    const response = messageHandler(params);

    const msg = this.whatsappHelper.textMessageFrom({
      to: from,
      text: response,
      replyingMessageId: messageId,
    });
    this.whatsappHelper.send(msg, { phoneNumberId });
  }
}
