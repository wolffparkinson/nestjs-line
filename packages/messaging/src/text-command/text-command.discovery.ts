import { MessageEvent } from '@line/bot-sdk';
import { MessagingBaseDiscovery } from '../context';

export interface TextCommandMeta {
  name: string;
  skipPrefix?: true;
  strict?: true;
}

export class TextCommandDiscovery extends MessagingBaseDiscovery<TextCommandMeta> {
  public override execute(event: MessageEvent) {
    return super.execute([event]);
  }

  public override isTextCommand(): this is TextCommandDiscovery {
    return true;
  }

  public getPrefixedName(prefix?: string) {
    if (!this.meta.skipPrefix && !prefix)
      throw new Error(
        `TextCommand ${this.meta.name} requires prefix, but no prefix specified in configuration`
      );
    return (this.meta.skipPrefix ? '' : prefix) + this.getName();
  }

  public getName() {
    return this.meta.name;
  }

  public isStrict() {
    return Boolean(this.meta.strict);
  }
}
