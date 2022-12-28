import { Request } from 'express';
import { Observable } from 'rxjs';

import { AppError } from '@shared/errors/app-error';
import { validateToken } from '@shared/utils/validate-token';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtBearerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('Token must be not found', 'TOKEN_NOT_FOUND', 401);
    }

    const [, accessToken] = authorization.split(/\s/);

    if (!accessToken) {
      throw new AppError('Token must be not found', 'TOKEN_NOT_FOUND', 401);
    }

    request.author = validateToken(accessToken);

    return true;
  }
}
