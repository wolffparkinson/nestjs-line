import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextOf, MessagingExecutionContext } from '../../context';
import { EventReplyPipe } from '../event-reply.pipe';

export const Reply = () =>
  createParamDecorator((_, context: ExecutionContext) => {
    const messagingCtx = MessagingExecutionContext.create(context);
    const [event] = messagingCtx.getContext<ContextOf<any>>();

    const replyToken = event.replyToken;
    if (!replyToken)
      throw new Error(`Event of type ${event.type} is not repliable`);
    return replyToken;
  })(EventReplyPipe);
