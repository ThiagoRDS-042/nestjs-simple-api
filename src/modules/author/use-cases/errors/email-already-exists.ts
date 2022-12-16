export class EmailAlreadyEXists extends Error {
  constructor() {
    super('Email already exists');
  }
}
