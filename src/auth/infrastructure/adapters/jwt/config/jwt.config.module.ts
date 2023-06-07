import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt/dist/jwt.module';
import { JWTConfigAdapter } from './jwt.config';
import { JWTConfigAdapterToken } from "../../../../tokens/auth-tokens";

@Module({
  providers: [
    {
      provide: JWTConfigAdapterToken,
      useClass: JWTConfigAdapter,
    },
  ],
  imports: [
    Jwt.registerAsync({
      global: true,
      inject: [JWTConfigAdapterToken],
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JWTConfigAdapter) => ({
        signOptions: {
          expiresIn: jwtConfigService.getJwtExpirationTime() + 's',
        },
        secret: jwtConfigService.getJwtSecret(),
      }),
    }),
  ],
  exports: [Jwt, JWTConfigAdapterToken],
})
export class JwtConfigModule {}
