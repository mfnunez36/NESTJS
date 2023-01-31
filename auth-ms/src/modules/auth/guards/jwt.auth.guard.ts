import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppRoles, ErrorsEnum } from 'src/common/enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user || user.roles[0] === AppRoles.USER_GENERAL) {
      throw err || new UnauthorizedException(ErrorsEnum.UNAUTHORIZED);
    }

    return user;
  }
}
