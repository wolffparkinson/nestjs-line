import { LineNotifyService } from '@nestjs-line/notify';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';

@Controller()
export class NotifyController {
  private readonly logger = new Logger();
  constructor(private readonly lineNotify: LineNotifyService) {}

  @Get('/line/notify')
  getOauthUrl() {
    return this.lineNotify.generateOauthURL({
      state: 'some-state',
    });
  }

  @Get('/line/notify/callback')
  async callback(@Query('code') code: string, @Query('state') state: string) {
    const accessToken = await this.lineNotify.token(code);
    return accessToken;
  }

  @Get('/line/notify/status')
  async status(@Query('token') token: string) {
    const status = await this.lineNotify.status(token);
    return status;
  }
  @Get('/line/notify/revoke')
  async revoke(@Query('token') token: string) {
    const result = await this.lineNotify.revoke(token);
    return result;
  }

  @Get('/line/notify/send')
  async send(@Query('token') token: string) {
    const result = await this.lineNotify.send({
      token,
      message: 'Test message',
    });
    return result;
  }
}
