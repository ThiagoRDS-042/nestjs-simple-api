import { DatabaseModule } from '@shared/infra/database/database.module';

import { Module } from '@nestjs/common';

import { JwtCookieGuard } from './infra/guards/jwt-cookie-guard';
import { AuthController } from './infra/http/controllers/auth.controller';
import { AuthenticateAuthorAccount } from './use-cases/authenticate-author-account';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthenticateAuthorAccount, JwtCookieGuard],
  exports: [AuthenticateAuthorAccount],
})
export class AuthModule {}
