/* eslint-disable @typescript-eslint/ban-types */
import { Reflector } from '@nestjs/core';
import { ListenerDiscovery } from '../listeners';
import { PostbackDiscovery } from '../postback/postback.discovery';
import { TextCommandDiscovery } from '../text-command';

interface DiscoveredItem {
  class: any;
  handler?: (...args: any[]) => any;
}

// TODO: Move TypeGuards to ExecutionContext
export abstract class MessagingBaseDiscovery<T = any> {
  protected readonly reflector = new Reflector();

  protected declare discovery: DiscoveredItem;

  protected declare contextCallback: Function;

  public constructor(protected readonly meta: T) {}

  public getClass() {
    return this.discovery.class;
  }

  public getHandler() {
    return this.discovery.handler;
  }

  public setDiscoveryMeta(meta: DiscoveredItem) {
    this.discovery ??= meta;
  }

  public setContextCallback(fn: Function) {
    this.contextCallback ??= fn;
  }

  public execute(context: any = []) {
    return this.contextCallback(context, this);
  }

  public isTextCommand(): this is TextCommandDiscovery {
    return false;
  }

  public isPostback(): this is PostbackDiscovery {
    return false;
  }

  public isListener(): this is ListenerDiscovery {
    return false;
  }
}
