import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MessagingExecutionContext } from '../../context';

export const PostbackOptions = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const messagingContext = MessagingExecutionContext.create(ctx);
    const [event] = messagingContext.getContext<'postback'>();
    const discovery = messagingContext.getDiscovery();

    if (!discovery.isPostback() || event.type !== 'postback') return null;

    const match = discovery.matcher(event.postback.data);

    if (!match) return null;

    return data ? match.params[data] : match.params;
  }
);
