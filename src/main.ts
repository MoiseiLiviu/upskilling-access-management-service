import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from "./auth/interface/grpc/proto/auth.pb";
import { HttpExceptionFilter } from "./auth/infrastructure/filter/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5001',
        package: protobufPackage,
        protoPath: 'node_modules/upskilling-protos/proto/auth.proto'
      }
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();
}
bootstrap();
