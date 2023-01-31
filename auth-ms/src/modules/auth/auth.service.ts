import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserEntity } from 'src/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findForLogin(email);
    if (user && (await compare(password, user.password))) {
      delete user.password;
      Logger.log('Usuario Valido');
      return user;
    }
    Logger.log('No se valido el Usuario');
    return null;
  }

  async login(user: UserEntity) {
    const { id, username, email } = user;
    const payload = { sub: id, username, email };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
