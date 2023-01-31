import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GetSecretCodeQueryDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly secretCode?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
