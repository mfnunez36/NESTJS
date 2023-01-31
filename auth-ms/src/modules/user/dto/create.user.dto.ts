import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRoles } from 'src/common/enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  readonly password: string;

  @IsNotEmpty()
  @IsUUID('4')
  readonly secretCode: string;

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `debe ser un ROL valido`,
  })
  readonly roles: string[];

  @IsOptional()
  @IsBoolean()
  readonly active: boolean;
}
