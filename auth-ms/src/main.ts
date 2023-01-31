import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { setDefaultUser } from './modules/user/config/default.user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const config = app.get(ConfigService);
  // documentacion swagger auto
  initSwagger(app);

  /**
   * creamos un usuario admin default para trabajar en la app
   * desde que se inicia.
   */
  setDefaultUser(config);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // filtra lo que no necesita
      forbidNonWhitelisted: true, // esto es para indicar error si es badrequest
      transformOptions: {
        enableImplicitConversion: true, // aseguramos que los tipos de datos de typescript van a ser siempre correctos
      },
    }),
  );
  await app.listen(AppModule.port);
  Logger.log(`Server is running in Port ${AppModule.port}`);

  // Graceful Shutdown
  process.on('SIGINT', () => {
    app.close().then(() => Logger.log('Server is Closed'));
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    app.close().then(() => Logger.log('Server is Closed'));
    process.exit(0);
  });
}
bootstrap();
