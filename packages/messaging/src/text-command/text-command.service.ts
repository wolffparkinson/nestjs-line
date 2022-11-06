import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { TextCommandDiscovery } from './text-command.discovery';
import { TEXT_COMMAND_METADATA } from '../messaging.constants';
import { ExplorerService } from '../services/messaging-explorer.service';
import { MODULE_OPTIONS_TOKEN } from '../messaging.module-definition';
import { LineMessagingModuleOptions } from '../messaging-options.interface';
import { LineMessagingService } from '../messaging.service';

@Injectable()
export class TextCommandService
  implements OnModuleInit, OnApplicationBootstrap
{
  public readonly textCommands = new Map<string, TextCommandDiscovery>();
  private readonly logger = new Logger(TextCommandService.name);

  public constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LineMessagingModuleOptions,
    private readonly service: LineMessagingService,
    private readonly explorerService: ExplorerService<TextCommandDiscovery>
  ) {}

  public onModuleInit() {
    this.explorerService
      .explore(TEXT_COMMAND_METADATA)
      .forEach((textCommand) => {
        const name = textCommand.getPrefixedName(this.options.prefix);
        if (name.includes(' ')) {
          throw new Error(
            `TextCommand "${name}" contains invalid character " "`
          );
        }
        const cmd = this.textCommands.get(name);
        if (cmd) throw new Error(`Duplicate TextCommand : ${name}`);

        return this.textCommands.set(name, textCommand);
      });
  }

  public onApplicationBootstrap() {
    return this.service.on('message', (event) => {
      if (event.message.type !== 'text') return;
      const message = event.message.text;
      if (!message.length) return;

      const content: string = message.toLowerCase().trim();
      const args = content.split(/ +/g);
      const cmd = args.shift();
      if (!cmd) return;

      const command = this.textCommands.get(cmd);
      if (!command) return;
      if (command.isStrict() && args.length) return;

      command.execute(event);
    });
  }
}
