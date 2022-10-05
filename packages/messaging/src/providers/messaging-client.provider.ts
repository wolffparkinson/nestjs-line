import { Client } from '@line/bot-sdk';
import { Provider } from '@nestjs/common';
import { LineMessagingModuleOptions } from '../messaging-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../messaging.module-definition';

export const MessagingClientProvider: Provider<Client> = {
  provide: Client,
  useFactory: (options: LineMessagingModuleOptions) => new Client(options),
  inject: [MODULE_OPTIONS_TOKEN],
};
