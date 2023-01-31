import { Module } from '@nestjs/common';
import { DatabseProvider } from './database.service';

@Module({
  imports: [DatabseProvider],
  exports: [DatabseProvider], // sirve para que este disponible desde cualquier modulo
})
export class DatabaseModule {}
