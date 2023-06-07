export interface CreateCookieWithRefreshTokenPort {
  createCookieWithRefreshToken(email: string): Promise<string>;
}