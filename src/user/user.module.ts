import { Module } from '@nestjs/common';
import { UserTypeormModule } from './infrastructure/typeorm/user-typeorm.module';

@Module({
  imports: [UserTypeormModule],
  exports: [UserTypeormModule],
})
export class UserModule {}
