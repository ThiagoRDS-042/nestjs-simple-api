import { Response } from 'express';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

import { AppError } from './app-error';

interface IErrorResponse {
  message: string[];
  statusCode: number;
  error: string;
}

@Catch(Error)
export class HttpException implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string[];
    let statusCode: number;
    let code: string;

    if (exception instanceof AppError) {
      const response = exception.getResponse();

      message = [response.message];
      code = response.error;
      statusCode = response.statusCode;
    } else if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as IErrorResponse;

      message = response.message;
      code = response.error;
      statusCode = response.statusCode;
    } else {
      message = ['Internal server error'];
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
