export class APIException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIException';
  }
}

export class ValidationException extends Error {
  constructor(message: string) {
    super(`Validation Error: (${message})`);
    this.name = 'ValidationException';
  }
}
