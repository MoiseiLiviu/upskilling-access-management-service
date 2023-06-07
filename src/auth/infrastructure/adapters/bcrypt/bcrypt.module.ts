import { Module } from '@nestjs/common';
import { BcryptAdapter } from './bcrypt.adapter';
import { BcryptAdapterToken } from "../../../tokens/auth-tokens";

@Module({
  providers: [
    {
      provide: BcryptAdapterToken,
      useClass: BcryptAdapter,
    },
  ],
  exports: [BcryptAdapterToken],
})
export class BcryptModule {}
