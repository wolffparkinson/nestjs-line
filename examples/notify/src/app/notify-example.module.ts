import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';

@Module({
  controllers: [NotifyController],
  providers: [],
})
export class NotifyExampleModule {}
