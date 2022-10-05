import { Injectable } from '@nestjs/common';
import { Reply, EventReply, Postback } from '@nestjs-line/messaging';

@Injectable()
export class SimplePostback {
  @Postback('action1')
  onPostback(@Reply() reply: EventReply) {
    return reply.message({ type: 'text', text: 'Postback reply' });
  }
}
