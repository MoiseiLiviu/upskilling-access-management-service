import { ValidateAccessTokenPort } from '../ports/input/validate-access-token.port';
import { JWTPort } from '../ports/output/jwt.port';
import { TokenPayload } from '../../domain/core/model/auth';
import { AccessTokenValidationResult } from '../dto/validate-access-token.dto';
import { HttpStatus } from '@nestjs/common';
import { UserRepository } from '../../../user/domain/core/repositories/user-repository.interface';

export class ValidateAccessTokenUseCase implements ValidateAccessTokenPort {
  constructor(
    private readonly jwt: JWTPort,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string): Promise<AccessTokenValidationResult> {
    const decoded: TokenPayload = await this.jwt.checkToken(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const user = await this.userRepository.getUserByEmail(decoded.email);

    if (!user) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: user.id };
  }
}
