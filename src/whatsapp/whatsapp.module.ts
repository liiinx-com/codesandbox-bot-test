import { HttpModule, Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { WhatsappHelper } from './whatsapp.helper';
import { WhatsappMessageHandler } from './whatsapp.message-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [WhatsappController],
  providers: [WhatsappService, WhatsappHelper, WhatsappMessageHandler],
})
export class WhatsappModule {}
