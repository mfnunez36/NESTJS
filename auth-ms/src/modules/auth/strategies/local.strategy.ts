import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ErrorsEnum } from 'src/common/enum';
import { UserEntity } from 'src/entities';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    Logger.log('Validate init LocalStrategy');
    const user: UserEntity = await this.authService.validateUser(
      email,
      password,
    );

    if (!user) throw new UnauthorizedException(ErrorsEnum.UNAUTHORIZED);

    return user;
  }
}
