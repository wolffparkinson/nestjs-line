import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './notify.module-definition';
import { LineNotifyService } from './notify.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [LineNotifyService],
  exports: [LineNotifyService],
})
export class LineNotifyModule extends ConfigurableModuleClass {}
