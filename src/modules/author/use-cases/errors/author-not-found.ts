export class AuthorNotFound extends Error {
  constructor() {
    super('Author does not exists');
  }
}
