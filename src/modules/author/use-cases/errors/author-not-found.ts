export class AuthorNotFound extends Error {
  private readonly _code: string;

  constructor() {
    super('Author does not exist');
    this._code = 'AUTHOR_NOT_FOUND';
  }

  get code(): string {
    return this._code;
  }
}
