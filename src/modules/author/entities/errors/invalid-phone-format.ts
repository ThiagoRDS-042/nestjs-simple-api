export class InvalidPhoneFormat extends Error {
  private readonly _code: string;

  constructor() {
    super('Invalid phone format');
    this._code = 'INVALID_PHONE_FORMAT';
  }

  get code(): string {
    return this._code;
  }
}
