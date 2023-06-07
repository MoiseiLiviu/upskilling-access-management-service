import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RefreshRequest,
  RefreshResponse,
  RegisterUserInput,
  RegistrationResponse,
  ValidateRequest,
  ValidateResponse,
} from './proto/auth.pb';
import {
  LOGIN_USE_CASE,
  LOGOUT_USE_CASE,
  REFRESH_ACCESS_TOKEN_COOKIE_USE_CASE,
  REGISTER_USE_CASE,
  VALIDATE_ACCESS_TOKEN_USE_CASE,
} from '../../tokens/auth-tokens';
import { LoginPort } from '../../application/ports/input/login.port';
import { LogoutPort } from '../../application/ports/input/logout.port';
import { RegisterUserPort } from '../../application/ports/input/register-user.port';
import { CreateUserCommand } from '../../application/dto/create-user.command';
import { ValidateAccessTokenPort } from '../../application/ports/input/validate-access-token.port';
import { RefreshAccessTokenCookiePort } from '../../application/ports/input/refresh-access-token-cookie.port';

@Controller()
export class AuthController {
  constructor(
    @Inject(LOGIN_USE_CASE)
    private readonly loginPort: LoginPort,
    @Inject(LOGOUT_USE_CASE)
    private readonly logoutPort: LogoutPort,
    @Inject(REGISTER_USE_CASE)
    private readonly registerUserPort: RegisterUserPort,
    @Inject(VALIDATE_ACCESS_TOKEN_USE_CASE)
    private readonly validateAccessTokenPort: ValidateAccessTokenPort,
    @Inject(REFRESH_ACCESS_TOKEN_COOKIE_USE_CASE)
    private readonly refreshAccessTokenCookiePort: RefreshAccessTokenCookiePort,
  ) {}

  @GrpcMethod('AuthService', 'LoginUser')
  loginUser(payload: LoginInput): Promise<LoginResponse> {
    return this.loginPort.login(payload.email, payload.password);
  }

  @GrpcMethod('AuthService', 'RegisterUser')
  async registerUser(
    payload: RegisterUserInput,
  ): Promise<RegistrationResponse> {
    const user = await this.registerUserPort.createUser(
      new CreateUserCommand(payload.email, payload.password),
    );
    return { userId: user.id };
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(): Promise<LogoutResponse> {
    return this.logoutPort.logout();
  }

  @GrpcMethod('AuthService', 'Refresh')
  async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
    const accessTokenCookie = await this.refreshAccessTokenCookiePort.execute(
      payload.refreshToken,
    );
    return { accessTokenCookie };
  }

  @GrpcMethod('AuthService', 'Validate')
  validate(payload: ValidateRequest): Promise<ValidateResponse> {
    return this.validateAccessTokenPort.execute(payload.token);
  }
}
