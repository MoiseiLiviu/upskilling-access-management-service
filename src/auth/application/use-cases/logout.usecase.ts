import { LogoutPort } from '../ports/input/logout.port';

export class LogoutUseCase implements LogoutPort {
  logout() {
    return {
      logoutCookie: [
        'Authentication=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0',
      ],
    };
  }
}
