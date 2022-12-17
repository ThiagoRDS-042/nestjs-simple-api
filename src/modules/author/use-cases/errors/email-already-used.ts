export class EmailAlreadyUsed extends Error {
  private readonly _code: string;

  constructor() {
    super('Email already used');
    this._code = 'EMAIL_ALREADY_USED';
  }

  get code(): string {
    return this._code;
  }
}
