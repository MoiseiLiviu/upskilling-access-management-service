import { Module } from "@nestjs/common";
import { JwtConfigModule } from "../infrastructure/adapters/jwt/config/jwt.config.module";
import { BcryptModule } from "../infrastructure/adapters/bcrypt/bcrypt.module";
import {
  BcryptAdapterToken,
  CREATE_COOKIE_WITH_ACCESS_TOKEN_USE_CASE,
  CREATE_COOKIE_WITH_REFRESH_TOKEN_USE_CASE,
  GET_USER_IF_REFRESH_TOKEN_IS_VALID_USE_CASE,
  JWTAdapterToken,
  JWTConfigAdapterToken,
  LOGIN_USE_CASE,
  LOGOUT_USE_CASE,
  REFRESH_ACCESS_TOKEN_COOKIE_USE_CASE,
  REGISTER_USE_CASE,
  VALIDATE_ACCESS_TOKEN_USE_CASE,
  VALIDATE_CREDENTIALS_USE_CASE
} from "../tokens/auth-tokens";
import { JWTConfigPort } from "./ports/output/jwt-config.port";
import { JWTPort } from "./ports/output/jwt.port";
import { CreateCookieWithAccessTokenUseCase } from "./use-cases/create-cookie-with-access-token.usecase";
import { UserRepositoryToken } from "../../user/tokens/user-tokens";
import { UserRepository } from "../../user/domain/core/repositories/user-repository.interface";
import { BcryptPort } from "./ports/output/bcrypt.port";
import { CreateCookieWithRefreshTokenUseCase } from "./use-cases/create-cookie-with-refresh-token";
import { GetUserIfRefreshTokenMatchesUseCase } from "./use-cases/get-user-if-refresh-token-matches.usecase";
import { ValidateCredentialsUseCase } from "./use-cases/validate-credentials.usecase";
import { LogoutUseCase } from "./use-cases/logout.usecase";
import { JwtModule } from "../infrastructure/adapters/jwt/jwt.module";
import { RegisterUserUseCase } from "./use-cases/register-user-use.case";
import { UserTypeormModule } from "../../user/infrastructure/typeorm/user-typeorm.module";
import { CreateCookieWithAccessTokenPort } from "./ports/input/create-cookie-with-access-token.port";
import { CreateCookieWithRefreshTokenPort } from "./ports/input/create-cookie-with-refresh-token.port";
import { LoginUseCase } from "./use-cases/login.usecase";
import { ValidateCredentialsPort } from "./ports/input/validate-credentials.port";

import { ValidateAccessTokenUseCase } from "./use-cases/validate-access-token.usecase";
import { LoggerAdapterToken, LoggerModule, LoggerPort } from "@nest-upskilling/common";
import { RefreshAccessTokenCookieUseCase } from "./use-cases/refresh-access-token-cookie.usecase";
import { GetUserIfRefreshTokenMatchesPort } from "./ports/input/get-user-if-refresh-token-matches.port";

@Module({
  imports: [
    JwtConfigModule,
    BcryptModule,
    LoggerModule,
    UserTypeormModule,
    JwtModule
  ],
  providers: [
    {
      inject: [JWTConfigAdapterToken, JWTAdapterToken, LoggerAdapterToken],
      provide: CREATE_COOKIE_WITH_ACCESS_TOKEN_USE_CASE,
      useFactory: (
        jwtConfigService: JWTConfigPort,
        jwtService: JWTPort,
        logger: LoggerPort
      ) =>
        new CreateCookieWithAccessTokenUseCase(
          jwtConfigService,
          jwtService,
          logger
        )
    },
    {
      inject: [
        LoggerAdapterToken,
        JWTConfigAdapterToken,
        JWTAdapterToken,
        UserRepositoryToken,
        BcryptAdapterToken
      ],
      provide: CREATE_COOKIE_WITH_REFRESH_TOKEN_USE_CASE,
      useFactory: (
        logger: LoggerPort,
        jwtConfigService: JWTConfigPort,
        jwtService: JWTPort,
        userRepository: UserRepository,
        bcryptService: BcryptPort
      ) =>
        new CreateCookieWithRefreshTokenUseCase(
          logger,
          jwtConfigService,
          jwtService,
          userRepository,
          bcryptService
        )
    },
    {
      inject: [BcryptAdapterToken, UserRepositoryToken, LoggerAdapterToken],
      provide: GET_USER_IF_REFRESH_TOKEN_IS_VALID_USE_CASE,
      useFactory: (
        bcryptService: BcryptPort,
        userRepository: UserRepository,
        logger: LoggerPort
      ) =>
        new GetUserIfRefreshTokenMatchesUseCase(
          bcryptService,
          userRepository,
          logger
        )
    },
    {
      inject: [UserRepositoryToken, BcryptAdapterToken, LoggerAdapterToken],
      provide: VALIDATE_CREDENTIALS_USE_CASE,
      useFactory: (
        userRepository: UserRepository,
        bcryptService: BcryptPort,
        logger: LoggerPort
      ) =>
        new ValidateCredentialsUseCase(userRepository, bcryptService, logger)
    },
    {
      provide: LOGOUT_USE_CASE,
      useFactory: () => new LogoutUseCase()
    },
    {
      inject: [UserRepositoryToken, BcryptAdapterToken],
      provide: REGISTER_USE_CASE,
      useFactory: (userRepository: UserRepository, bcryptAdapter: BcryptPort) =>
        new RegisterUserUseCase(userRepository, bcryptAdapter)
    },
    {
      inject: [
        CREATE_COOKIE_WITH_ACCESS_TOKEN_USE_CASE,
        CREATE_COOKIE_WITH_REFRESH_TOKEN_USE_CASE,
        VALIDATE_CREDENTIALS_USE_CASE
      ],
      provide: LOGIN_USE_CASE,
      useFactory: (
        createCookieWithAccessTokenPort: CreateCookieWithAccessTokenPort,
        createCookieWithRefreshTokenPort: CreateCookieWithRefreshTokenPort,
        validateCredentialsPort: ValidateCredentialsPort
      ) =>
        new LoginUseCase(
          validateCredentialsPort,
          createCookieWithAccessTokenPort,
          createCookieWithRefreshTokenPort
        )
    },
    {
      provide: VALIDATE_ACCESS_TOKEN_USE_CASE,
      inject: [JWTAdapterToken, UserRepositoryToken],
      useFactory: (jwtPort: JWTPort, userRepository: UserRepository) =>
        new ValidateAccessTokenUseCase(jwtPort, userRepository)
    },
    {
      provide: REFRESH_ACCESS_TOKEN_COOKIE_USE_CASE,
      inject: [GET_USER_IF_REFRESH_TOKEN_IS_VALID_USE_CASE, CREATE_COOKIE_WITH_ACCESS_TOKEN_USE_CASE, JWTAdapterToken],
      useFactory: (getUserIfRefreshTokenMatchesPort: GetUserIfRefreshTokenMatchesPort,
                   createCookieWithAccessTokenPort: CreateCookieWithAccessTokenPort,
                   jwtPort: JWTPort) => new RefreshAccessTokenCookieUseCase(getUserIfRefreshTokenMatchesPort, createCookieWithAccessTokenPort, jwtPort)
    }
  ],
  exports: [
    CREATE_COOKIE_WITH_ACCESS_TOKEN_USE_CASE,
    VALIDATE_CREDENTIALS_USE_CASE,
    CREATE_COOKIE_WITH_REFRESH_TOKEN_USE_CASE,
    LOGOUT_USE_CASE,
    GET_USER_IF_REFRESH_TOKEN_IS_VALID_USE_CASE,
    REGISTER_USE_CASE,
    LOGIN_USE_CASE,
    VALIDATE_ACCESS_TOKEN_USE_CASE,
    REFRESH_ACCESS_TOKEN_COOKIE_USE_CASE
  ]
})
export class AuthApplicationModule {
}
