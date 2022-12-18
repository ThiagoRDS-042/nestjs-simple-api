import { AppError } from '@shared/errors/app-error';

export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new AppError(
        'Invalid content length',
        'INVALID_CONTENT_LENGTH',
        400,
      );
    }

    this.content = content;
  }

  private validateContentLength(content: string): boolean {
    return content.length > 5 && content.length <= 240;
  }

  public get value(): string {
    return this.content;
  }

  public static newContent(content: string): Content {
    const instanceContent = new Content(content);

    return instanceContent;
  }
}
