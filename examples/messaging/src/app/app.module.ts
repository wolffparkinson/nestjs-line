import { Module } from '@nestjs/common';
import { LineMessagingModule } from '@nestjs-line/messaging';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  configuration,
  ValidatedConfigService,
} from './configuration/configuration';
import { validationSchema } from './configuration/validation';
import { ExamplesModule } from './examples.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    LineMessagingModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ValidatedConfigService) => {
        return {
          channelAccessToken: config.getOrThrow('lineMessagingToken'),
          channelSecret: config.getOrThrow('lineMessagingSecret'),
          prefix: '.',
          webhookUrl: process.env['LINE_WEBHOOK_URL'],
        };
      },
    }),
    ExamplesModule,
  ],
})
export class AppModule {}
