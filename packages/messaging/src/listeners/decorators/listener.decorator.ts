import { ListenerDiscovery, ListenerMeta } from '../listener.discovery';
import { SetMetadata } from '@nestjs/common';
import { LISTENERS_METADATA } from '../../messaging.constants';

export const Listener = (options: ListenerMeta) =>
  SetMetadata<string, ListenerDiscovery>(
    LISTENERS_METADATA,
    new ListenerDiscovery(options)
  );
