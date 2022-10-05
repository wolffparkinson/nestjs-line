import { Global, Module } from '@nestjs/common';
import { MessagingClientProvider } from './providers/messaging-client.provider';
import { ExplorerService } from './services/messaging-explorer.service';
import { MessagingController } from './messaging.controller';
import { ConfigurableModuleClass } from './messaging.module-definition';
import { TextCommandService } from './text-command';
import { DiscoveryModule } from '@nestjs/core';
import { PostbackService } from './postback';
import { LineMessagingService } from './messaging.service';
import { ListenerDiscovery, ListenersService } from './listeners';

@Global()
@Module({
  imports: [DiscoveryModule],
  controllers: [MessagingController],
  providers: [
    MessagingClientProvider,
    LineMessagingService,
    ExplorerService,
    TextCommandService,
    PostbackService,
    ListenerDiscovery,
    ListenersService,
  ],
  exports: [MessagingClientProvider, LineMessagingService],
})
export class LineMessagingModule extends ConfigurableModuleClass {}
