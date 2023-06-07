/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface RegistrationResponse {
  userId: number;
}

export interface LogoutRequest {
}

export interface LogoutResponse {
  logoutCookie: string[];
}

export interface LoginResponse {
  accessTokenCookie: string;
  refreshTokenCookie: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessTokenCookie: string;
}

export interface RegisterUserInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  registerUser(request: RegisterUserInput): Observable<RegistrationResponse>;

  loginUser(request: LoginInput): Observable<LoginResponse>;

  refresh(request: RefreshRequest): Observable<RefreshResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  registerUser(
    request: RegisterUserInput,
  ): Promise<RegistrationResponse> | Observable<RegistrationResponse> | RegistrationResponse;

  loginUser(request: LoginInput): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  refresh(request: RefreshRequest): Promise<RefreshResponse> | Observable<RefreshResponse> | RefreshResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["registerUser", "loginUser", "refresh", "logout", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
