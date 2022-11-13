import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappMessageHandler {
  // private readonly newLine: string = '\n';

  getVika = (): string => {
    return '\n';
  };

  hi = () => {
    console.log('****', this);
    return `hixxxx hi` + this.getVika() + `1. for x\n2. for yz`;
  };

  generalMenu() {
    return `1. for x\n2. for z`;
  }
}
