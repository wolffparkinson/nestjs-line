import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LineNotifyModuleOptions } from './notify-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LineNotifyModuleOptions>().build();
