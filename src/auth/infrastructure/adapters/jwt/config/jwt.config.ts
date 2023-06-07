import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  JWT_REFRESH_TOKEN_EXPIRATION_EXPIRATION_TIME_SECONDS,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_TOKEN_EXPIRATION_EXPIRATION_TIME_SECONDS,
  JWT_TOKEN_SECRET,
} from './config.constants';
import { JWTConfigPort } from "../../../../application/ports/output/jwt-config.port";

@Injectable()
export class JWTConfigAdapter implements JWTConfigPort{
  constructor(private readonly configService: ConfigService) {}

  getJwtExpirationTime(): string {
    return this.configService.get(JWT_TOKEN_EXPIRATION_EXPIRATION_TIME_SECONDS);
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get(
      JWT_REFRESH_TOKEN_EXPIRATION_EXPIRATION_TIME_SECONDS,
    );
  }

  getJwtRefreshSecret(): string {
    return this.configService.get(JWT_REFRESH_TOKEN_SECRET);
  }

  getJwtSecret(): string {
    return this.configService.get(JWT_TOKEN_SECRET);
  }
}
