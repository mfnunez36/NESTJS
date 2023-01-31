import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from 'src/common/decorators';
import { AppRoles, ResponseEnum } from 'src/common/enum';
import { UserEntity } from '../../entities';
import { MailService } from '../mailer/mail.service';
import {
  ActiveUserDto,
  CreateUserDto,
  EditUserDto,
  GetSecretCodeQueryDto,
  PaginationQueryDto,
  RegistrationUserDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('Users API')
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  async getAll(@Query() pagination?: PaginationQueryDto): Promise<any> {
    Logger.log('GetAll Init Request');
    const data: UserEntity[] = await this.userService.getUsers(pagination);
    return { data };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    Logger.log('GetById Init Request');
    const data = await this.userService.getUserById(id);
    return { data };
  }

  @Auth()
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<any> {
    Logger.log('Create Init Request');
    const data = await this.userService.createUser(dto);

    return { message: ResponseEnum.USER_CREATED, data };
  }

  @Auth()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ): Promise<any> {
    Logger.log('Update Init Request');
    const data = await this.userService.updateUser(id, dto);
    return { message: ResponseEnum.USER_EDITED, data };
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    Logger.log('Remove Init Request');
    const data = await this.userService.deleteUser(id);
    return { message: ResponseEnum.USER_DELETED, data };
  }

  @Auth()
  @Put('changestatus/:id')
  async changeStatus(@Param('id', ParseIntPipe) id: number): Promise<any> {
    Logger.log('Change Status User user Init Request');
    const data = await this.userService.changeStatus(id);
    const response = data.active
      ? { message: ResponseEnum.USER_ENABLED, data }
      : { message: ResponseEnum.USER_DISABLED, data };

    return response;
  }

  @Post('signup')
  async registerUser(@Body() dto: RegistrationUserDto): Promise<any> {
    Logger.log('Register User Init Request');
    const data = await this.userService.createUser({
      ...dto,
      secretCode: uuidv4(),
      roles: [AppRoles.USER_GENERAL],
    });

    // Enviamos correo con el codigo
    await this.mailService.SendMail(data);

    return { message: ResponseEnum.USER_REGISTERED, data };
  }

  @Post('activate')
  async activateUser(@Body() dto: ActiveUserDto): Promise<any> {
    Logger.log('Activate User Init');
    const data = await this.userService.activeUser(dto.secretCode);
    return { message: ResponseEnum.USER_ACTIVATED, data };
  }

  @Post('getcode')
  async getSecret(@Body() dto: GetSecretCodeQueryDto): Promise<any> {
    const user = await this.userService.getSecretCode(dto.email);

    // Enviamos correo con el codigo
    await this.mailService.SendMail(user);

    return {
      message: ResponseEnum.USER_GET_SECRET_CODE,
      code: user.secretCode,
    };
  }

  @Post('resetpwd')
  async resetPasswod(@Body() dto: GetSecretCodeQueryDto): Promise<any> {
    const { secretCode, password } = dto;
    const user = await this.userService.resetPassword(secretCode, password);
    return { message: ResponseEnum.USER_RESET_PASSWORD, user };
  }
}
