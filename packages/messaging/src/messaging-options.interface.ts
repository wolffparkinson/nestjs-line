import { ClientConfig } from '@line/bot-sdk';

export interface LineMessagingModuleOptions extends ClientConfig {
  channelSecret: string;
  setWebhookUrl?: string;
  prefix?: string;
  debug?: true;
}
