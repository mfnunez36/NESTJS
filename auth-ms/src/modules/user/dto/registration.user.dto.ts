import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create.user.dto';

export class RegistrationUserDto extends OmitType(CreateUserDto, [
  'roles',
  'secretCode', // Omitimos algunos parametros para nuestro uso
] as const) {}
