import { ContextType, ExecutionContext } from '@nestjs/common';
import { MessagingArgumentsHost } from './messaging-arguments-host';

export type MessagingContextType = 'line_messaging' | ContextType;

export class MessagingExecutionContext extends MessagingArgumentsHost {
  public static override create(
    context: ExecutionContext
  ): MessagingExecutionContext {
    const type = context.getType();
    const messagingContext = new MessagingExecutionContext(
      context.getArgs(),
      context.getClass(),
      context.getHandler()
    );
    messagingContext.setType(type);
    return messagingContext;
  }
}
