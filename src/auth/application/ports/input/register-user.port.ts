import { UserWithoutPassword } from '../../../../user/domain/core/models/user.model';
import { CreateUserCommand } from '../../dto/create-user.command';

export interface RegisterUserPort {
  createUser(
    createUserCommand: CreateUserCommand,
  ): Promise<UserWithoutPassword>;
}
