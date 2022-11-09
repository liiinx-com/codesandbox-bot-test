import {
  Get,
  Post,
  Controller,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

const verifyToken = '11557';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get()
  root() {
    return { ok: true };
  }

  @Post('webhook')
  webhookHandler(@Req() req: any) {
    if (req.body.object === 'whatsapp_business_account') {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        const phoneNumberId =
          req.body.entry[0].changes[0].value.metadata.phone_number_id;
        const messageId: string =
          req.body.entry[0].changes[0].value.messages[0].id;
        const from: string =
          req.body.entry[0].changes[0].value.messages[0].from;
        const message: any =
          req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
        this.whatsappService.handleMessageFrom(phoneNumberId, {
          messageId,
          from,
          message,
        });
      }

      return 'EVENT_RECEIVED';
    }
  }

  @Get('webhook')
  webhookValidator(@Req() req: any): string {
    const verify_token = verifyToken;
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'].toString();
    if (!mode && !token)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      return challenge;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
