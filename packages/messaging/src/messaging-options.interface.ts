import { ClientConfig } from '@line/bot-sdk';

export interface LineMessagingModuleOptions extends ClientConfig {
  channelSecret: string;
  webhookUrl?: string;
  prefix?: string;
  debug?: true;
}
