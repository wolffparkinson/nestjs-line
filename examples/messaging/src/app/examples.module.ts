import { Module } from '@nestjs/common';
import { FlexMessageReply } from './commands/flex-message/flex-message';
import { SimpleCommand } from './commands/simple-command/simple-command';
import { WithoutPrefixCommand } from './commands/without-prefix/without-prefix';
import { PostbackWithOptions } from './postback/postback-with-options';
import { SimplePostback } from './postback/simple-postback';

@Module({
  providers: [
    SimpleCommand,
    FlexMessageReply,
    WithoutPrefixCommand,
    SimplePostback,
    PostbackWithOptions,
  ],
})
export class ExamplesModule {}
