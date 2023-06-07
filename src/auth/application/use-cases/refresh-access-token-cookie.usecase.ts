import { RefreshAccessTokenCookiePort } from '../ports/input/refresh-access-token-cookie.port';
import { GetUserIfRefreshTokenMatchesPort } from '../ports/input/get-user-if-refresh-token-matches.port';
import { CreateCookieWithAccessTokenPort } from '../ports/input/create-cookie-with-access-token.port';
import { JWTPort } from '../ports/output/jwt.port';
import { TokenPayload } from '../../domain/core/model/auth';

export class RefreshAccessTokenCookieUseCase
  implements RefreshAccessTokenCookiePort
{
  constructor(
    private readonly getUserIfRefreshTokenMatchesPort: GetUserIfRefreshTokenMatchesPort,
    private readonly createCookieWithAccessTokenPort: CreateCookieWithAccessTokenPort,
    private readonly jwtPort: JWTPort,
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const decoded: TokenPayload = await this.jwtPort.checkToken(refreshToken);
    const user = await this.getUserIfRefreshTokenMatchesPort.execute(
      refreshToken,
      decoded.email,
    );

    return this.createCookieWithAccessTokenPort.execute(user.email);
  }
}
