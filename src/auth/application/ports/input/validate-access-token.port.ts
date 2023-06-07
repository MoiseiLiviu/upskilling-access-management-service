import { AccessTokenValidationResult } from "../../dto/validate-access-token.dto";

export interface ValidateAccessTokenPort {
  execute(token: string): Promise<AccessTokenValidationResult>;
}