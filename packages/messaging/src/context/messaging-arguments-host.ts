import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ArgumentsHost } from '@nestjs/common';
import { MessagingContextType } from './messaging-execution-context';
import { MessagingBaseDiscovery } from '.';
import { ContextOf } from './messaging-context.interface';
import { MessagingClientEvents } from '../listeners/listener.interface';

export class MessagingArgumentsHost extends ExecutionContextHost {
  public static create(context: ArgumentsHost): MessagingArgumentsHost {
    const type = context.getType();
    const messagingContext = new MessagingArgumentsHost(context.getArgs());
    messagingContext.setType(type);
    return messagingContext;
  }

  public override getType<
    TContext extends string = MessagingContextType
  >(): TContext {
    return super.getType();
  }

  public getContext<T extends keyof MessagingClientEvents>(): ContextOf<T>;
  public getContext<T>(): T;
  public getContext<T extends keyof MessagingClientEvents>(): ContextOf<T> {
    return this.getArgByIndex(0);
  }

  public getDiscovery(): MessagingBaseDiscovery {
    return this.getArgByIndex(1);
  }
}
