import { HttpModule, Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { WhatsappHelper } from './whatsapp.helper';

@Module({
  imports: [HttpModule],
  controllers: [WhatsappController],
  providers: [WhatsappService, WhatsappHelper],
})
export class WhatsappModule {}
