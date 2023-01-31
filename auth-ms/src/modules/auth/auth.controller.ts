import {
  Body,
  Controller,
  Get,
  Logger,
  NotImplementedException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { ErrorsEnum, ResponseEnum } from 'src/common/enum';
import { UserEntity } from 'src/entities';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
    Logger.log('login Init Request');
    const data = await this.authService.login(user);
    return { message: ResponseEnum.AUTHENTICATED, data: data };
  }

  @Auth()
  @Get('refresh')
  async refreshToken(@User() user: UserEntity) {
    Logger.log('refreshToken Init Request');
    const data = await this.authService.login(user);

    if (!data) {
      throw new NotImplementedException(ErrorsEnum.REFRESH_TOKEN_ERROR);
    }

    return {
      message: ResponseEnum.REFRESH_TOKEN_SUCCESS,
      data,
    };
  }
}
