import { User } from "../models/user.model";

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
  updateLastLogin(email: string): Promise<void>;
  updateRefreshToken(email: string, refreshToken: string): Promise<void>;
  save(user: User): Promise<User>;
  getById(id: number): Promise<User>;
}
