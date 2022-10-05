import { match } from 'path-to-regexp';
import { MessagingBaseDiscovery } from '../context';
import { PostbackEvent } from '@line/bot-sdk';

export interface PostbackActionMeta {
  customId: string;
}

export class PostbackDiscovery extends MessagingBaseDiscovery<PostbackActionMeta> {
  public readonly matcher = match<Record<string, any>>(this.meta.customId);

  public override execute(event: PostbackEvent) {
    return super.execute([event]);
  }

  public override isPostback(): this is PostbackDiscovery {
    return true;
  }

  public getCustomId() {
    return this.meta.customId;
  }
}
