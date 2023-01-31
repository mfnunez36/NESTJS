import { IsOptional, IsString } from 'class-validator';

export class ActiveUserDto {
  @IsString()
  @IsOptional()
  readonly secretCode?: string;
}
