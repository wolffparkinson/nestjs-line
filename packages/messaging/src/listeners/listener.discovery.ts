import { MessagingBaseDiscovery } from '../context';
import { MessagingClientEvents } from './listener.interface';

export interface ListenerMeta {
  events: Array<keyof MessagingClientEvents>;
}

export class ListenerDiscovery extends MessagingBaseDiscovery<ListenerMeta> {
  public getEvents() {
    return this.meta.events;
  }

  public override isListener(): this is ListenerDiscovery {
    return true;
  }
}
