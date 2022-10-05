import { TextCommand, Reply, EventReply } from '@nestjs-line/messaging';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WithoutPrefixCommand {
  @TextCommand({ name: 'hello', skipPrefix: true })
  onHello(@Reply() reply: EventReply) {
    return reply.text('without prefix');
  }
}
