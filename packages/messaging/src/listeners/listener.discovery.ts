import { MessagingBaseDiscovery } from '../context';
import { MessagingClientEvents } from './listener.interface';

export interface ListenerMeta {
  event: keyof MessagingClientEvents;
}

export class ListenerDiscovery extends MessagingBaseDiscovery<ListenerMeta> {
  public getEvent() {
    return this.meta.event;
  }

  public override isListener(): this is ListenerDiscovery {
    return true;
  }
}
