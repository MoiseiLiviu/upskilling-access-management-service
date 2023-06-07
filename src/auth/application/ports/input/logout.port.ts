export interface LogoutPort {
  logout(): {logoutCookie: string[]};
}