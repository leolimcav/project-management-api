export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly key?: string;

  constructor(message: string, statusCode: number, key?: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.key = key;
  }
}
