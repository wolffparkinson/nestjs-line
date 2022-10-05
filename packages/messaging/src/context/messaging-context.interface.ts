import { MessageEvent, TextEventMessage } from '@line/bot-sdk';
import { MessagingClientEvents } from '../listeners/listener.interface';

export type TextCommandContext = [MessageEvent & { message: TextEventMessage }];
export type TextCommandCtx = TextCommandContext;

export type ContextOf<K extends keyof E, E = MessagingClientEvents> = E[K];
