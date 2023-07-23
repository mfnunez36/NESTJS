import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePublicationDto, UpdatePublicationDto } from './dto';
import { Publication } from './publication.entity';
import { PublicationsService } from './publication.service';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationsService) {}

  @Get()
  getPublications(): Publication[] {
    return this.publicationService.getPublications();
  }

  @Get(':id')
  getPublication(@Param('id') id: string): Publication {
    return this.publicationService.getPublication(id);
  }

  @Post()
  createPublication(@Body() message: CreatePublicationDto): void {
    return this.publicationService.createPublication(message);
  }

  @Patch(':id')
  updatePublication(
    @Param('id') id: string,
    @Body() { message }: UpdatePublicationDto,
  ): Publication {
    return this.publicationService.updatePublication(id, message);
  }

  @Delete(':id')
  deletePublication(@Param('id') id: string): void {
    return this.publicationService.removePublication(id);
  }
}
