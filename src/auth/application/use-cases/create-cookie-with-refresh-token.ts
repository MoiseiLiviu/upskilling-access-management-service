import { CreateCookieWithRefreshTokenPort } from '../ports/input/create-cookie-with-refresh-token.port';
import { JWTConfigPort } from '../ports/output/jwt-config.port';
import { IJwtServicePayload, JWTPort } from '../ports/output/jwt.port';
import { BcryptPort } from '../ports/output/bcrypt.port';
import { UserRepository } from "../../../user/domain/core/repositories/user-repository.interface";
import { LoggerPort } from '@nest-upskilling/common';

export class CreateCookieWithRefreshTokenUseCase
  implements CreateCookieWithRefreshTokenPort
{
  constructor(
    private readonly logger: LoggerPort,
    private readonly jwtConfigService: JWTConfigPort,
    private readonly jwtService: JWTPort,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptPort,
  ) {}

  async createCookieWithRefreshToken(email: string) {
    this.logger.log(
      'CreateCookieWithRefreshTokenUseCase execute',
      `Cookie with refresh token generated for user with email ${email}.`,
    );
    const payload: IJwtServicePayload = { email };
    const secret = this.jwtConfigService.getJwtRefreshSecret();
    const expiresIn = this.jwtConfigService.getJwtRefreshExpirationTime();
    const token = this.jwtService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, email);

    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfigService.getJwtRefreshExpirationTime()}`;
  }
  private async setCurrentRefreshToken(token: string, email: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(token);
    await this.userRepository.updateRefreshToken(
      email,
      currentHashedRefreshToken,
    );
  }
}
