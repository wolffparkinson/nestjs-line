import { MessageEvent, PostbackEvent, TextEventMessage } from '@line/bot-sdk';
import { MessagingClientEvents } from '../listeners/listener.interface';

export type TextCommandContext = [MessageEvent & { message: TextEventMessage }];
export type TextCommandCtx = TextCommandContext;

export type PostbackContext = [PostbackEvent];
export type PostbackCtx = PostbackContext;

export type ContextOf<K extends keyof E, E = MessagingClientEvents> = E[K];
