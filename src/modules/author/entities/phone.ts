export class Phone {
  private readonly phone: string;

  constructor(phone: string) {
    const isPhoneFormatValid = this.validatePhoneFormat(phone);

    if (!isPhoneFormatValid) {
      throw new Error('Invalid phone format');
    }

    this.phone = phone;
  }

  private validatePhoneFormat(phone: string): boolean {
    return /\(\d{2}\)\s\d{1}\.\d{4}-\d{4}/.test(phone);
  }

  get value(): string {
    return this.phone;
  }
}
