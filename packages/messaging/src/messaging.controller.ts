import { WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagingGuard } from './guards/messaging.guard';
import { LineMessagingService } from './messaging.service';

@Controller('/line')
@UseGuards(MessagingGuard)
export class MessagingController {
  constructor(private readonly service: LineMessagingService) {}

  @Post('/messaging')
  onPost(@Body() { destination, events }: WebhookRequestBody) {
    return this.service.handleEvents(events);
  }
}
