import { Injectable, OnModuleInit } from '@nestjs/common';
import { ListenerDiscovery } from './listener.discovery';
import { ExplorerService } from '../services/messaging-explorer.service';
import { LISTENERS_METADATA } from '../messaging.constants';
import { LineMessagingService } from '../messaging.service';

@Injectable()
export class ListenersService implements OnModuleInit {
  public constructor(
    private readonly client: LineMessagingService,
    private readonly explorerService: ExplorerService<ListenerDiscovery>
  ) {}

  public onModuleInit() {
    return this.explorerService
      .explore(LISTENERS_METADATA)
      .forEach((listener) =>
        this.client.on(listener.getEvent(), (...args) => listener.execute(args))
      );
  }
}
