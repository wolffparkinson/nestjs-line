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
