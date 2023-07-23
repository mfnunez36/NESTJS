import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // filtra lo que no necesita
      forbidNonWhitelisted: true, // esto es para indicar error si es badrequest
    }),
  );
  await app.listen(4000);
}
bootstrap();
