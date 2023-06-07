import { JWTConfigPort } from "../ports/output/jwt-config.port";
import { CreateCookieWithAccessTokenPort } from "../ports/input/create-cookie-with-access-token.port";
import { IJwtServicePayload, JWTPort } from "../ports/output/jwt.port";
import { LoggerPort } from "@nest-upskilling/common";


export class CreateCookieWithAccessTokenUseCase implements CreateCookieWithAccessTokenPort{
  constructor(
    private readonly jwtConfigService: JWTConfigPort,
    private readonly jwtService: JWTPort,
    private readonly logger: LoggerPort,
  ) {}

  async execute(email: string) {
    this.logger.log(
      'CreateCookieWithAccessTokenUseCase execute',
      `Cookie with access token generated for user with email ${email}.`,
    );
    const payload: IJwtServicePayload = { email };
    const secret = this.jwtConfigService.getJwtSecret();
    const expiresIn = this.jwtConfigService.getJwtExpirationTime();
    const token = this.jwtService.createToken(payload, secret, expiresIn);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.getJwtExpirationTime()}`;
  }
}
