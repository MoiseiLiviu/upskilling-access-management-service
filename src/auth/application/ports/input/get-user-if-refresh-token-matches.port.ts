import { User } from '../../../../user/domain/core/models/user.model';

export interface GetUserIfRefreshTokenMatchesPort {
  execute(
    refreshToken: string,
    email: string,
  ): Promise<User>;
}
