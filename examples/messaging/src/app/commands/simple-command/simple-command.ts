import { TextCommand, Reply, EventReply } from '@nestjs-line/messaging';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SimpleCommand {
  @TextCommand({ name: 'hello' })
  onHello(@Reply() reply: EventReply) {
    return reply.text('world');
  }
}
