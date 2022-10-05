import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { createHmac } from 'crypto';
import type { IncomingMessage } from '../types/http';
import { Observable } from 'rxjs';
import { LineMessagingModuleOptions } from '../messaging-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../messaging.module-definition';

@Injectable()
export class MessagingGuard implements CanActivate {
  private readonly logger = new Logger(MessagingGuard.name);

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LineMessagingModuleOptions
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IncomingMessage>();

    if (!request.rawBody) throw new Error('Request rawBody undefined');

    const signature = createHmac('SHA256', this.options.channelSecret)
      .update(request.rawBody)
      .digest('base64');
    if (signature === request?.headers['x-line-signature']) {
      return true;
    }

    this.logger.error('Invalid LINE signature');
    return false;
  }
}
