export interface RefreshAccessTokenCookiePort {
  execute(refreshToken: string): Promise<string>;
}