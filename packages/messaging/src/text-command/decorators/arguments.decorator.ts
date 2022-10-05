import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MessagingExecutionContext, TextCommandContext } from '../../context';

export const Arguments = createParamDecorator(
  (_, context: ExecutionContext) => {
    const messagingCtx = MessagingExecutionContext.create(context);
    const [event] = messagingCtx.getContext<TextCommandContext>();
    const discovery = messagingCtx.getDiscovery();

    if (!discovery.isTextCommand()) return null;

    return event.message.text.split(/ +/g).slice(1);
  }
);

export const Args = Arguments;
