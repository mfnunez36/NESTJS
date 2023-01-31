import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
export class EditUserDto extends PartialType(CreateUserDto) {}
/**
 * PartialType hace que extendamos en base a otra clase y todos sus campos son opcionales
 */
