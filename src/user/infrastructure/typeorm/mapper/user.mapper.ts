import { UserEntity } from '../entities/user.entity';
import { User } from "../../../domain/core/models/user.model";

export class UserMapper {
  public static toUserModel(userEntity: UserEntity): User {
    const user = new User();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.password = userEntity.password;
    user.lastLogin = userEntity.last_login;
    user.hashRefreshToken = userEntity.hash_refresh_token;

    return user;
  }

  public static toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.last_login = user.lastLogin;

    return userEntity;
  }
}
