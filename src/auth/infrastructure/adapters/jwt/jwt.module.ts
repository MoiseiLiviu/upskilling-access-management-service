import { Module } from '@nestjs/common';
import { JWTAdapter } from './jwt.adapter';
import { JWTAdapterToken } from '../../../tokens/auth-tokens';

@Module({
  providers: [
    {
      provide: JWTAdapterToken,
      useClass: JWTAdapter,
    },
  ],
  exports: [JWTAdapterToken],
})
export class JwtModule {}
