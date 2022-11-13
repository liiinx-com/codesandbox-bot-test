import { HttpService, Injectable } from '@nestjs/common';

const TOKEN =
  'EAAPYZCJH2zBwBAIH1d4iWkarlkLNw6PrsUvgSaE4MdPb0AZBK8j47qeZBJuZB7IJNMXZCveGuLdVYR5ZApb2zBSoq3ZBmRWf4yNIzdZB2YT5Us0PVgMasB9jUj3WBcuOUhkEBc7o8XmcXRsAIY8uDesDR4eZBeJp6u7dQBZAir9j9Pi75xLIPROYbiLfoo30ckSNl7TkeM8vYY3p1MY4ZCZBAabH';

@Injectable()
export class WhatsappHelper {
  private static baseUrl = 'https://graph.facebook.com/v15.0/';
  constructor(private readonly http: HttpService) {}

  private getUrl({ phoneNumberId }) {
    return WhatsappHelper.baseUrl + phoneNumberId + '/messages';
  }

  private getHeaders() {
    return {
      Authorization: 'Bearer ' + TOKEN,
    };
  }

  cleanMessage(message: string) {
    const parts = message.split(' ');
    return parts.map((m: string) => m.toLocaleLowerCase()).join('-');
  }

  textMessageFrom({ to, text, replyingMessageId = null, previewUrl = false }) {
    const result: any = {
      type: 'text',
      to,
      text: { body: text, preview_url: previewUrl },
    };
    if (replyingMessageId) result.context = { message_id: replyingMessageId };
    return result;
  }

  async send(data: object, { phoneNumberId, recipient_type = 'individual' }) {
    const updatedPayload = {
      ...data,
      recipient_type,
      messaging_product: 'whatsapp',
    };

    console.log('sending => ', JSON.stringify(updatedPayload, null, 2));
    const headers = this.getHeaders();
    return this.http
      .post(this.getUrl({ phoneNumberId }), updatedPayload, { headers })
      .toPromise();
  }
}
