import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LineMessagingModuleOptions } from './messaging-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LineMessagingModuleOptions>().build();
