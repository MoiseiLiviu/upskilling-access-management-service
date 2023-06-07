import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepositoryToken } from "../../tokens/user-tokens";
import { UserRepositoryImpl } from "./repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: UserRepositoryToken,
    useClass: UserRepositoryImpl
  }],
  exports: [UserRepositoryToken],
})
export class UserTypeormModule {

}