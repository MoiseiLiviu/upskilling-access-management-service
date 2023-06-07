import { Module } from '@nestjs/common';
import { AuthApplicationModule } from './application/auth-application.module';
import { AuthController } from "./interface/grpc/auth.controller";

@Module({
  controllers: [AuthController],
  imports: [AuthApplicationModule],
})
export class AuthModule {}
