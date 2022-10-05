import type { IncomingMessage } from 'http';

export interface IncomingMessage extends IncomingMessage {
  rawBody?: Buffer;
}
