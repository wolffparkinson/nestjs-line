import EventEmitter from 'events';
import { Client, WebhookEvent } from '@line/bot-sdk';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';

import { LineMessagingModuleOptions } from './messaging-options.interface';
import { MODULE_OPTIONS_TOKEN } from './messaging.module-definition';
import { MessagingClientEvents } from './listeners/listener.interface';

@Injectable()
export class LineMessagingService
  extends EventEmitter.EventEmitter
  implements OnApplicationBootstrap
{
  private readonly client: Client;
  private readonly logger = new Logger(LineMessagingService.name);

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LineMessagingModuleOptions
  ) {
    super({ captureRejections: true });
    this.client = new Client(this.options);
  }

  async onApplicationBootstrap() {
    const url = this.options.setWebhookUrl;
    if (url) {
      try {
        await this.client.setWebhookEndpointUrl(url);
        if (this.options.debug)
          this.logger.debug(`LINE Messaging webhook url set to : ${url}`);
      } catch (e) {
        this.logger.error(e);
      }
    }
  }

  public handleEvents(events: WebhookEvent[]) {
    return events.map((event) => {
      return this.emit<any>(event.type, event);
    });
  }
}

export type Awaitable<T> = T | PromiseLike<T>;

export interface LineMessagingService extends EventEmitter {
  on<K extends keyof MessagingClientEvents>(
    event: K,
    listener: (...args: MessagingClientEvents[K]) => Awaitable<void>
  ): this;

  emit<K extends keyof MessagingClientEvents>(
    event: K,
    ...args: MessagingClientEvents[K]
  ): boolean;

  off<K extends keyof MessagingClientEvents>(
    event: K,
    listener: (...args: MessagingClientEvents[K]) => Awaitable<void>
  ): this;

  removeAllListeners<K extends keyof MessagingClientEvents>(event?: K): this;
}
