import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/core/repositories/user-repository.interface';
import { User } from '../../../domain/core/models/user.model';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}
  async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email,
      },
      { hash_refresh_token: refreshToken },
    );
  }
  async getUserByEmail(email: string): Promise<User> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        email,
      },
    });
    if (!userEntity) {
      return null;
    }
    return UserMapper.toUserModel(userEntity);
  }
  async updateLastLogin(email: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  }

  async save(user: User): Promise<User> {
    const userEntity = UserMapper.toUserEntity(user);
    const savedUser = await this.userEntityRepository.save(userEntity);
    return UserMapper.toUserModel(savedUser);
  }

  async getById(id: number): Promise<User> {
    const userEntity = await this.userEntityRepository.findOneBy({ id });
    return UserMapper.toUserModel(userEntity);
  }
}
