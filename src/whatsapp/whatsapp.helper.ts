import { HttpService, Injectable } from '@nestjs/common';

const TOKEN =
  'EAAPYZCJH2zBwBAMP8QoK21HewWfVB0osheLKRY58LR03zDKHiUvhwLw0W48sfhYEfLebcHV3bs2HhXNJk8wKZA5ZAA8RcwDITHpgPsFOCp2wCWvtA2SADrhXU43BgcRtXezxE27nE7IbcA5dmZAL4jDK0UpvU6wWCc4JtRdYfAxvfCMd5BZBoYEP9KW3LOhGhtkZAKfZAmbOgI5GCytfIrK';

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
    const updatedData = {
      ...data,
      recipient_type,
      messaging_product: 'whatsapp',
    };

    console.log('sending => ', JSON.stringify(updatedData, null, 2));
    const headers = this.getHeaders();
    return this.http
      .post(this.getUrl({ phoneNumberId }), updatedData, { headers })
      .toPromise();
  }
}
