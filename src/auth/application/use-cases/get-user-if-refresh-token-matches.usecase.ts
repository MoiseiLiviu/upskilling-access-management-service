import { BcryptPort } from "../ports/output/bcrypt.port";
import { GetUserIfRefreshTokenMatchesPort } from "../ports/input/get-user-if-refresh-token-matches.port";
import { UserRepository } from "../../../user/domain/core/repositories/user-repository.interface";
import { LoggerPort } from "@nest-upskilling/common";


export class GetUserIfRefreshTokenMatchesUseCase
  implements GetUserIfRefreshTokenMatchesPort
{
  constructor(
    private readonly bcryptService: BcryptPort,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerPort,
  ) {}

  async execute(refreshToken: string, email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
    this.logger.warn('JwtStrategy', `User not found or hash not correct`);
  }
}
