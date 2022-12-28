import { Request } from 'express';

import { AppError } from '@shared/errors/app-error';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentAuthResponse {
  authorId: string;
}

export const CurrentAuth = createParamDecorator(
  (_dados: unknown, ctx: ExecutionContext): ICurrentAuthResponse => {
    try {
      const request = ctx.switchToHttp().getRequest<Request>();

      const { id: authorId } = request.author;

      return { authorId };
    } catch (error) {
      throw new AppError('Forbidden', 'FORBIDDEN', 403);
    }
  },
);
