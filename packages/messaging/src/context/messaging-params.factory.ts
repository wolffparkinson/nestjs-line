import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { MessagingParamType } from './messaging-paramtype.enum';
import { MessagingBaseDiscovery } from '.';
import { ParamData } from '@nestjs/common';

export class MessagingParamsFactory implements ParamsFactory {
  public exchangeKeyForValue(
    type: number,
    data: ParamData,
    args: [Array<any>, MessagingBaseDiscovery]
  ): any {
    if (!args) return null;

    switch (type as MessagingParamType) {
      case MessagingParamType.CONTEXT:
        return args[0];
      case MessagingParamType.DISCOVERY:
        return args[1];
      default:
        return null;
    }
  }
}
