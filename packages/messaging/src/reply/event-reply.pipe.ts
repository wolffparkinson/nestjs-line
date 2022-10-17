import {
  Client,
  Message,
  QuickReply,
  TextMessage,
  WebhookEvent,
} from '@line/bot-sdk';
import { stringSplit } from '../utils/string-split';
import { Injectable, Logger, PipeTransform } from '@nestjs/common';

@Injectable()
export class EventReplyPipe implements PipeTransform<string, EventReply> {
  private readonly logger = new Logger(EventReplyPipe.name);

  constructor(private readonly client: Client) {}

  transform(replyToken: string) {
    return new EventReply(replyToken, this.client);
  }
}

export class EventReply {
  private readonly logger = new Logger(EventReply.name);

  constructor(
    private readonly replyToken: string,
    private readonly client: Client
  ) {}
  async message(
    message: Message | Message[],
    notificationDisabled?: boolean | undefined
  ) {
    return this.client.replyMessage(
      this.replyToken,
      message,
      notificationDisabled
    );
  }
  async text(
    text: string | string[],
    quickReply?: QuickReply,
    notificationDisabled?: boolean | undefined
  ) {
    const texts = Array.isArray(text) ? text : [text];
    const txtArrays: string[] = [];
    const messages: TextMessage[] = [];

    texts.forEach((txt: string) => {
      const subArrays = stringSplit(txt, 5000);
      subArrays.forEach((sa) => txtArrays.push(sa));
    });

    txtArrays.forEach((output, index) => {
      if (index === 4) {
        messages.push({
          type: 'text',
          text:
            output.slice(0, 4900) +
            '\n...Skipping messages due to character limit',
        });
      } else if (index < 4) {
        messages.push({
          type: 'text',
          text: output,
        });
      }
    });

    const last = messages.pop();
    if (last) {
      last.quickReply = quickReply;
      messages.push(last);
    }

    return this.client.replyMessage(
      this.replyToken,
      messages,
      notificationDisabled
    );
  }

  public static fromEvent(event: WebhookEvent, client: Client) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const replyToken = event.replyToken;
    if (!replyToken) return;
    return new EventReply(replyToken, client);
  }
}
