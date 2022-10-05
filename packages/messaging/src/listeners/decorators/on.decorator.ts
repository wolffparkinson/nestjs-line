import { Listener } from './listener.decorator';
import { MessagingClientEvents } from '../listener.interface';

export const On = <K extends keyof MessagingClientEvents>(event: K) =>
  Listener({ event });
