import { AppError } from '@shared/errors/app-error';

import { Content } from './content';

describe('Content', () => {
  it('should be able to create a new content', () => {
    const content = Content.newContent('Is a new post created');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a new content', () => {
    expect(() => Content.newContent('Test')).toThrow(AppError);
  });
});
