import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationsService } from './publication.service';

@Module({
  controllers: [PublicationController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
