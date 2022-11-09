import { HttpService, Injectable } from '@nestjs/common';

const TOKEN =
  'EAAPYZCJH2zBwBAIYEZBWXXTEHNc8LK6dzhZASvOnzl5Kdy17ul5nRsjleCWN35eL0x4uhx4yjTkCDAcA5AUopq9uGEL7VcKAnVOZAEAziPiUAk2ekVaCVZBIRessCU92GvHGJjkbKPGRZCG222AHpFK5jWCeeMT3IZAe8Fas9ZAupQAChf234H7GKDQr7SEjZCEYFZCZAtapgAaJfPqqMyq6q3D';

@Injectable()
export class WhatsappHelper {
  private static baseUrl = 'https://graph.facebook.com/v12.0/';
  constructor(private readonly http: HttpService) {}

  getUrl({ phoneNumberId }) {
    return (
      'https://graph.facebook.com/v15.0/' +
      phoneNumberId +
      '/messages?access_token=' +
      TOKEN
    );
  }

  async send(data: object, { phoneNumberId, recipient_type = 'individual' }) {
    const updatedData = {
      ...data,
      // recipient_type,
      messaging_product: 'whatsapp',
    };
    console.log(this.getUrl({ phoneNumberId }));
    console.log('sending => ', JSON.stringify(updatedData, null, 2));
    return this.http
      .post(this.getUrl({ phoneNumberId }), updatedData)
      .toPromise();
  }
}
