import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'tls';

export const DatabseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const dbConfig = {
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      entities: [__dirname + '/../**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      // logging: config.get('DB_LOGGING'), //sirve para ver el log de las peticiones a la BD
      // logger: 'file', // sirve para guardar el log en un archivo ormlogs.log
    } as ConnectionOptions;
    return dbConfig;
  },
});
