export default class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly key?: string;

  constructor(message: string, statusCode: number, key?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.key = key;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
