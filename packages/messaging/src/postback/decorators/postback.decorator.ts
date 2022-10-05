import { SetMetadata } from '@nestjs/common';
import { POSTBACK_METADATA } from '../../messaging.constants';
import { PostbackDiscovery } from '../postback.discovery';

export const Postback = (customId: string): MethodDecorator =>
  SetMetadata<string, PostbackDiscovery>(
    POSTBACK_METADATA,
    new PostbackDiscovery({ customId })
  );
