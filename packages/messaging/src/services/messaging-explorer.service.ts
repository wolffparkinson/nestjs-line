import { Injectable } from '@nestjs/common';
import {
  MessagingBaseDiscovery,
  MessagingContextType,
  MessagingParamsFactory,
} from '../context';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { STATIC_CONTEXT } from '@nestjs/core/injector/constants';

@Injectable()
export class ExplorerService<
  T extends MessagingBaseDiscovery
> extends Reflector {
  private readonly messagingParamsFactory = new MessagingParamsFactory();

  private readonly wrappers = this.discoveryService
    .getProviders()
    .filter((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance ? Object.getPrototypeOf(instance) : null;

      return instance && prototype && wrapper.isDependencyTreeStatic();
    });

  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly externalContextCreator: ExternalContextCreator
  ) {
    super();
  }

  public explore(metadataKey: string): T[] {
    return this.flatMap((wrapper) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.filterProperties(wrapper, metadataKey)
    );
  }

  private flatMap(callback: (wrapper: InstanceWrapper) => T[]) {
    return this.wrappers.flatMap(callback).filter(Boolean);
  }

  private filterProperties({ instance }: InstanceWrapper, metadataKey: string) {
    const prototype = Object.getPrototypeOf(instance);

    return this.metadataScanner.scanFromPrototype(
      instance,
      prototype,
      (methodName) => {
        const item = this.get<T>(metadataKey, instance[methodName]);

        if (!item) return;

        item.setDiscoveryMeta({
          class: instance.constructor,
          handler: instance[methodName],
        });
        item.setContextCallback(
          this.createContextCallback(instance, prototype, methodName)
        );

        return item;
      }
    );
  }

  private createContextCallback(
    instance: object,
    prototype: any,
    methodName: string
  ) {
    return this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      MessagingContextType
    >(
      instance,
      prototype[methodName],
      methodName,
      ROUTE_ARGS_METADATA,
      this.messagingParamsFactory,
      STATIC_CONTEXT,
      undefined,
      { guards: true, filters: true, interceptors: true },
      'line_messaging'
    );
  }
}
