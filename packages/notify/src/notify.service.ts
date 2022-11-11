import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { LineNotifyModuleOptions } from './notify-options.interface';
import { MODULE_OPTIONS_TOKEN } from './notify.module-definition';
import {
  TokenResponse,
  TokenStatus,
  TokenRevoke,
  GenerateOauthUrlOptions,
  SendNotificationOptions,
} from './notify.interface';
import { InvalidCodeException, InvalidTokenException } from './notify.error';

// API Docs : https://notify-bot.line.me/doc/en/

@Injectable()
export class LineNotifyService {
  private readonly oauthUrlBase = new URL(
    '/oauth',
    'https://notify-bot.line.me'
  );
  private readonly apiUrlBase = new URL('/api', 'https://notify-api.line.me');

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: LineNotifyModuleOptions,
    private readonly httpService: HttpService
  ) {}

  public generateOauthURL(options: GenerateOauthUrlOptions) {
    const { state, responseMode } = options;

    const url = new URL(this.oauthUrlBase + '/authorize');
    url.searchParams.append('scope', 'notify');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', this.options.clientId);
    url.searchParams.append('redirect_uri', this.options.redirectUrl);
    url.searchParams.append('state', state);
    if (responseMode) url.searchParams.append('response_mode', responseMode);

    return url;
  }

  public async token(code: string) {
    const form = new FormData();
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('redirect_uri', this.options.redirectUrl);
    form.append('client_id', this.options.clientId);
    form.append('client_secret', this.options.clientSecret);

    try {
      const { data } = await this.httpService.axiosRef.postForm<TokenResponse>(
        new URL(this.oauthUrlBase + '/token').toString(),
        form
      );
      return data.access_token;
    } catch (error: any) {
      const status = error?.response?.status;
      switch (status) {
        case 400:
          throw new InvalidCodeException();
        default:
          throw error;
      }
    }
  }

  public async status(token: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<TokenStatus>(
        new URL(this.apiUrlBase + '/status').toString(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error: any) {
      const status = error?.response?.status;
      switch (status) {
        case 401:
          throw new InvalidTokenException();
        default:
          throw error;
      }
    }
  }

  public async revoke(token: string) {
    try {
      const { data } = await this.httpService.axiosRef.post<TokenRevoke>(
        new URL(this.apiUrlBase + '/revoke').toString(),
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return data;
    } catch (error: any) {
      const status = error?.response?.status;
      switch (status) {
        case 401:
          throw new InvalidTokenException();
        default:
          throw error;
      }
    }
  }

  public async send(options: SendNotificationOptions) {
    const {
      message,
      token,
      imageThumbnailUrl,
      imageUrl,
      // imageFile,
      sticker,
      notificationDisabled,
    } = options;

    if (message.length > 1000)
      throw new Error(
        'LINE Notify maximum character length for message is 1000 characters'
      );

    const form = new FormData();
    form.append('message', message);
    if (imageUrl) form.append('imageFullsize', imageUrl);
    if (imageThumbnailUrl) form.append('imageThumbnail', imageThumbnailUrl);
    // if (imageFile) form.append('imageFile', imageFile);
    if (sticker) {
      form.append('stickerPackageId', sticker.packageId);
      form.append('stickerId', sticker.id);
    }
    if (notificationDisabled) form.append('notificationDisabled', 'true');

    try {
      const { data } = await this.httpService.axiosRef.postForm<TokenResponse>(
        new URL(this.apiUrlBase + '/notify').toString(),
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error: any) {
      const status = error?.response?.status;
      switch (status) {
        case 401:
          throw new InvalidTokenException();
        default:
          throw error;
      }
    }
  }
}
