import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto';
import { Publication } from './publication.entity';

@Injectable()
export class PublicationsService {
  private publications: Publication[] = [
    {
      id: '1',
      message: 'hello world!',
    },
  ];

  getPublications(): Publication[] {
    return this.publications;
  }

  getPublication(id: string): Publication {
    const publication = this.publications.find((item) => item.id === id);

    if (!publication) {
      throw new NotFoundException('Not Found');
    }

    return publication;
  }

  createPublication({ message }: CreatePublicationDto): void {
    this.publications.push({
      id: (Math.floor(Math.random() * 2000) + 1).toString(),
      message,
    });
  }

  updatePublication(id: string, message: string): Publication {
    const item: Publication = this.getPublication(id);
    item.message = message;
    return item;
  }

  removePublication(id: string): void {
    const index = this.publications.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.publications.splice(index, 1);
    }
  }
}
