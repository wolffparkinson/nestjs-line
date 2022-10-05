import type { ConfigService } from '@nestjs/config';

export type Configuration = ReturnType<typeof configuration>;
export type ValidatedConfigService = ConfigService<Configuration, true>;

export const configuration = () => {
  return {
    lineMessagingSecret: process.env['LINE_MESSAGING_SECRET'],
    lineMessagingToken: process.env['LINE_MESSAGING_TOKEN'],
  };
};
