import { DatabaseModule } from '@shared/infra/database/database.module';

import { JwtStrategy } from '@modules/auth/infra/strategies/jwt-estrategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './infra/http/controllers/auth.controller';
import { AuthenticateAuthorAccount } from './use-cases/authenticate-author-account';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h', algorithm: 'HS256' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateAuthorAccount, JwtStrategy],
  exports: [JwtModule, AuthenticateAuthorAccount],
})
export class AuthModule {}
