import { GetUserByIdPort } from '../ports/get-user-by-id.port';
import { UserRepository } from '../../domain/core/repositories/user-repository.interface';
import { User } from '../../domain/core/models/user.model';

export class GetUserByIdUseCase implements GetUserByIdPort {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }
}
