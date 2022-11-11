import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { LineNotifyModuleOptions } from './notify-options.interface';
import { MODULE_OPTIONS_TOKEN } from './notify.module-definition';

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

  public generateOauthURL(options: {
    state: string;
    responseMode?: 'form_post';
  }) {
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

  public async send(options: {
    token: string;
    message: string;
    imageURL?: string;
    imageThumbnailURL?: string;
    // imageFile?: ReadableStream;
    notificationDisabled?: boolean;
    sticker?: { packageId: number; id: number };
  }) {
    const {
      message,
      token,
      imageThumbnailURL,
      imageURL,
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
    if (imageURL) form.append('imageFullsize', imageURL);
    if (imageThumbnailURL) form.append('imageThumbnail', imageThumbnailURL);
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

export interface TokenResponse {
  status: number;
  message: string;
  access_token: string;
}

export interface TokenStatus {
  status: number;
  message: string;
  target: string;
  targetType: 'USER' | 'GROUP';
}

export interface TokenRevoke {
  status: number;
  message: string;
}

export class InvalidCodeException extends Error {
  override name = InvalidCodeException.name;
  constructor() {
    super('Invalid code');
  }
}

export class InvalidTokenException extends Error {
  override name = InvalidTokenException.name;
  constructor() {
    super('Invalid access token');
  }
}
