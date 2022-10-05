import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ExplorerService } from '../services/messaging-explorer.service';
import { POSTBACK_METADATA } from '../messaging.constants';
import { LineMessagingService } from '../messaging.service';
import { PostbackDiscovery } from './postback.discovery';

@Injectable()
export class PostbackService implements OnModuleInit, OnApplicationBootstrap {
  private readonly postbacks = new Map<string, PostbackDiscovery>();

  public constructor(
    private readonly service: LineMessagingService,
    private readonly explorerService: ExplorerService<PostbackDiscovery>
  ) {}

  public onModuleInit() {
    return this.explorerService
      .explore(POSTBACK_METADATA)
      .forEach((postback) => {
        const customId = postback.getCustomId();

        const pb = this.postbacks.get(customId);
        if (pb) throw new Error(`Duplicate Postback : ${customId}`);

        this.postbacks.set(customId, postback);
      });
  }

  public onApplicationBootstrap() {
    return this.service.on('postback', (event) => {
      for (const modal of this.postbacks.values()) {
        if (modal.matcher(event.postback.data)) {
          return modal.execute(event);
        }
      }
    });
  }
}
