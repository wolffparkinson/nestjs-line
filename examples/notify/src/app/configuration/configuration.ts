import type { ConfigService } from '@nestjs/config';

export type Configuration = ReturnType<typeof configuration>;
export type ValidatedConfigService = ConfigService<Configuration, true>;

export const configuration = () => {
  return {
    notifyClientId: process.env['LINE_NOTIFY_CLIENT_ID'],
    notifyClientSecret: process.env['LINE_NOTIFY_CLIENT_SECRET'],
    notifyRedirectUri: process.env['LINE_NOTIFY_REDIRECT_URI'],
  };
};
