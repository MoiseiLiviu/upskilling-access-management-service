import { User } from "../../domain/core/models/user.model";

export interface GetUserByIdPort {
  execute(id: number): Promise<User>;
}