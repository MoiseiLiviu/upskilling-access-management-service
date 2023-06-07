import { RegisterUserPort } from '../ports/input/register-user.port';
import { UserRepository } from '../../../user/domain/core/repositories/user-repository.interface';
import { BcryptPort } from '../ports/output/bcrypt.port';
import { CreateUserCommand } from '../dto/create-user.command';
import {
  User,
  UserWithoutPassword,
} from '../../../user/domain/core/models/user.model';

export class RegisterUserUseCase implements RegisterUserPort {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptPort: BcryptPort,
  ) {}

  async createUser(
    createUserCommand: CreateUserCommand,
  ): Promise<UserWithoutPassword> {
    const hashedPwd = await this.bcryptPort.hash(createUserCommand.password);
    const user: User = new User();
    user.password = hashedPwd;
    user.email = createUserCommand.email;
    const { password, ...result } = await this.userRepository.save(user);

    return result;
  }
}
