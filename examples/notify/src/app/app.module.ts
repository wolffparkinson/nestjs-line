import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  configuration,
  ValidatedConfigService,
} from './configuration/configuration';
import { validationSchema } from './configuration/validation';
import { NotifyExampleModule } from './notify-example.module';
import { LineNotifyModule } from '@nestjs-line/notify';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    LineNotifyModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ValidatedConfigService) => {
        return {
          clientId: config.getOrThrow('notifyClientId'),
          clientSecret: config.getOrThrow('notifyClientSecret'),
          redirectUrl: config.getOrThrow('notifyRedirectUri'),
        };
      },
    }),
    NotifyExampleModule,
  ],
})
export class AppModule {}
