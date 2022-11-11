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

export interface GenerateOauthUrlOptions {
  state: string;
  responseMode?: 'form_post';
}

export interface SendNotificationOptions {
  token: string;
  message: string;
  imageUrl?: string;
  imageThumbnailUrl?: string;
  // imageFile?: ReadableStream;
  notificationDisabled?: boolean;
  sticker?: { packageId: number; id: number };
}
