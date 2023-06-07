import { Module } from "@nestjs/common";
import { GET_USER_BY_ID_USE_CASE, UserRepositoryToken } from "../tokens/user-tokens";
import { UserRepository } from "../domain/core/repositories/user-repository.interface";
import { GetUserByIdUseCase } from "./use-cases/get-user-by-id.usecase";
import { UserTypeormModule } from "../infrastructure/typeorm/user-typeorm.module";

@Module({
  imports: [UserTypeormModule],
  providers: [
    {
      inject: [UserRepositoryToken],
      provide: GET_USER_BY_ID_USE_CASE,
      useFactory: (userRepository: UserRepository) => new GetUserByIdUseCase(userRepository)
    }
  ],
  exports: [GET_USER_BY_ID_USE_CASE]
})
export class UserApplicationModule {}