import { AppError } from '@shared/errors/app-error';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentAuthResponse {
  authorId: string;
}

interface IUser {
  authorId: string;
}

interface IRequest {
  user: IUser;
}

export const CurrentAuth = createParamDecorator(
  (_dados: unknown, ctx: ExecutionContext): ICurrentAuthResponse => {
    try {
      const request = ctx.switchToHttp().getRequest<IRequest>();

      const { authorId } = request.user;

      return { authorId };
    } catch (error) {
      throw new AppError('Forbidden', 'FORBIDDEN', 403);
    }
  },
);
