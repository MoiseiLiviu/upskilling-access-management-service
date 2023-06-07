import { TokenBundle } from "../../../domain/core/model/token-bundle";

export interface LoginPort {
  login(email: string, pass: string): Promise<TokenBundle>;
}