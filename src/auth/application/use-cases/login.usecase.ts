import { LoginPort } from '../ports/input/login.port';
import { ValidateCredentialsPort } from '../ports/input/validate-credentials.port';
import { CreateCookieWithAccessTokenPort } from '../ports/input/create-cookie-with-access-token.port';
import { CreateCookieWithRefreshTokenPort } from '../ports/input/create-cookie-with-refresh-token.port';
import { TokenBundle } from '../../domain/core/model/token-bundle';

export class LoginUseCase implements LoginPort {
  constructor(
    private readonly validateCredentialsPort: ValidateCredentialsPort,
    private readonly createCookieWithAccessTokenPort: CreateCookieWithAccessTokenPort,
    private readonly createCookieWithRefreshTokenPort: CreateCookieWithRefreshTokenPort,
  ) {}

  async login(email: string, pass: string): Promise<TokenBundle> {
    await this.validateCredentialsPort.validateUserCredentials(email, pass);
    return {
      accessTokenCookie:
        await this.createCookieWithAccessTokenPort.execute(email),
      refreshTokenCookie:
        await this.createCookieWithRefreshTokenPort.createCookieWithRefreshToken(
          email,
        ),
    };
  }
}
