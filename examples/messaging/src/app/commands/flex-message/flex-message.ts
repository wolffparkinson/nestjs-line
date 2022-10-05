import { TextCommand, Reply, EventReply } from '@nestjs-line/messaging';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlexMessageReply {
  @TextCommand({ name: 'flex' })
  onHello(@Reply() reply: EventReply) {
    return reply.message({
      type: 'flex',
      altText: 'Flex Message',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Flex Message',
              weight: 'bold',
              size: 'xl',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'button',
              style: 'primary',
              height: 'sm',
              action: {
                type: 'postback',
                label: 'Postback Action',
                data: 'action1',
              },
            },
            {
              type: 'button',
              style: 'primary',
              height: 'sm',
              action: {
                type: 'postback',
                label: 'Postback With Args',
                data: 'action2/1/true',
              },
            },
          ],
          flex: 0,
        },
      },
    });
  }
}
