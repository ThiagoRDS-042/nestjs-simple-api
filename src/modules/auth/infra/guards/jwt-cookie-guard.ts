import { Request } from 'express';
import { Observable } from 'rxjs';

import { AppError } from '@shared/errors/app-error';
import { cookieParser } from '@shared/utils/cokkie-parser';
import { validateToken } from '@shared/utils/validate-token';

import { cookieConfig } from '@configs/cookie-config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtCookieGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { cookie } = request.headers;

    if (!cookie) {
      throw new AppError('Cookie must be not found', 'COOKIE_NOT_FOUND', 401);
    }

    const { key } = cookieConfig;

    const { [key]: accessToken } = cookieParser(cookie);

    if (!accessToken) {
      throw new AppError('Token must be not found', 'TOKEN_NOT_FOUND', 401);
    }

    request.author = validateToken(accessToken);

    return true;
  }
}
