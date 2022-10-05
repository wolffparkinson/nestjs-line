import { MessagingParamType } from '../messaging-paramtype.enum';
import { createMessagingParamDecorator } from './params.util';

export const Discovery = createMessagingParamDecorator(
  MessagingParamType.DISCOVERY
);
