import { AppError } from '@shared/errors/app-error';

import { Phone } from './phone';

describe('Phone', () => {
  it('should be able to create a new phone', () => {
    const phone = Phone.newPhone('(56) 9.2356-4556');

    expect(phone).toBeTruthy();
  });

  it('should not be able to create a new phone with invalid format', () => {
    expect(() => Phone.newPhone('invalid-format')).toThrow(AppError);
  });
});
