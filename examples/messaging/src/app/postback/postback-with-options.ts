import { Injectable, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import {
  Reply,
  EventReply,
  Postback,
  PostbackOptions,
} from '@nestjs-line/messaging';

@Injectable()
export class PostbackWithOptions {
  @Postback('action2/:arg1/:arg2')
  onPostback(
    @Reply() reply: EventReply,
    @PostbackOptions('arg1', ParseIntPipe) arg1: number,
    @PostbackOptions('arg2', ParseBoolPipe) arg2: boolean
  ) {
    return reply.message({
      type: 'text',
      text: `${typeof arg1}, ${typeof arg2}`,
    });
  }
}
