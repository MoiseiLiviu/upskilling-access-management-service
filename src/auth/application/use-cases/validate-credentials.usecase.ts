import { ValidateCredentialsPort } from '../ports/input/validate-credentials.port';
import { BcryptPort } from '../ports/output/bcrypt.port';
import { UserRepository } from '../../../user/domain/core/repositories/user-repository.interface';
import { UnauthorizedException } from "@nestjs/common";
import { LoggerPort } from '@nest-upskilling/common';

export class ValidateCredentialsUseCase implements ValidateCredentialsPort {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptPort,
    private readonly logger: LoggerPort,
  ) {}

  async validateUserCredentials(email: string, pass: string) {
    if (!email || !pass) {
      throw new UnauthorizedException('Email or password is missing');
    }
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.logger.warn(
        'ValidateUserCredentialsUseCase',
        `User not found with the email ${email}`,
      );
      throw new UnauthorizedException(`User not found with the email ${email}`);
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      await this.updateLoginTime(user.email);
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async updateLoginTime(email: string) {
    await this.userRepository.updateLastLogin(email);
  }
}
