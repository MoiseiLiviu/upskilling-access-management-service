export interface IJwtServicePayload {
  email: string;
}

export interface JWTPort {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
