import { InvalidPhoneFormat } from './errors/invalid-phone-format';

export class Phone {
  private readonly phone: string;

  constructor(phone: string) {
    const isPhoneFormatValid = this.validatePhoneFormat(phone);

    if (!isPhoneFormatValid) {
      throw new InvalidPhoneFormat();
    }

    this.phone = phone;
  }

  private validatePhoneFormat(phone: string): boolean {
    return /\(\d{2}\)\s\d{1}\.\d{4}-\d{4}/.test(phone);
  }

  public get value(): string {
    return this.phone;
  }

  public static newPhone(phone: string): Phone {
    const instancePhone = new Phone(phone);

    return instancePhone;
  }
}
