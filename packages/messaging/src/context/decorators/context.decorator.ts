import { MessagingParamType } from '../messaging-paramtype.enum';
import { createMessagingParamDecorator } from './params.util';

export const Context = createMessagingParamDecorator(
  MessagingParamType.CONTEXT
);

export const Ctx = Context;
