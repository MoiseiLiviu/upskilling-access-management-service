export class UserWithoutPassword {
  id: number;
  email: string;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class User extends UserWithoutPassword {
  password: string;
}