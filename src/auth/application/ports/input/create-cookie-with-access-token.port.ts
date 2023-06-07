export interface CreateCookieWithAccessTokenPort {
  execute(email: string): Promise<string>;
}
