import { User } from '../../../../user/domain/core/models/user.model';

export interface ValidateCredentialsPort {
  validateUserCredentials(email: string, pass: string): Promise<Partial<User>>;
}
