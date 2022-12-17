import { Response } from 'express';

import { InvalidPhoneFormat } from '@modules/author/entities/errors/invalid-phone-format';
import { AuthorNotFound } from '@modules/author/use-cases/errors/author-not-found';
import { EmailAlreadyUsed } from '@modules/author/use-cases/errors/email-already-used';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class HttpException implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let statusCode: number;
    let code: string;

    if (exception instanceof AuthorNotFound) {
      message = exception.message;
      code = exception.code;
      statusCode = 404;
    } else if (exception instanceof EmailAlreadyUsed) {
      message = exception.message;
      code = exception.code;
      statusCode = 409;
    } else if (exception instanceof InvalidPhoneFormat) {
      message = exception.message;
      code = exception.code;
      statusCode = 400;
    } else {
      message = 'Internal server error';
      code = 'INTERNAL_SERVER_ERROR';
      statusCode = 500;

      // eslint-disable-next-line no-console
      console.error({
        message,
        code,
      });
    }

    return response.status(statusCode).json({
      message,
      code,
    });
  }
}
