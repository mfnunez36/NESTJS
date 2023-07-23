import { IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  readonly message: string;
}
