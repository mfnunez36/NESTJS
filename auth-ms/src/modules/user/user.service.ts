import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto, PaginationQueryDto } from './dto';
import { UserEntity } from '../../entities';
import { ErrorsEnum } from '../../common/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(param?: PaginationQueryDto): Promise<UserEntity[]> {
    const { limit, offset } = param;
    return await this.userRepository.find({ skip: offset, take: limit });
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const exist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (exist) throw new BadRequestException(ErrorsEnum.ALREADY_EXIST);

    const user: UserEntity = await this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, dto: EditUserDto): Promise<EditUserDto> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    const userEdited: UserEntity = Object.assign(user, dto);
    return await this.userRepository.save(userEdited);
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    return await this.userRepository.remove(user);
  }

  async changeStatus(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    user.active = !user.active;

    return await this.userRepository.save(user);
  }

  async getSecretCode(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ email, active: true })
      .addSelect('user.secretCode')
      .getOne();

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    return user;
  }

  async resetPassword(
    secretCode: string,
    newPassword: string,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { secretCode },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);

    user.password = newPassword;
    return await this.userRepository.save(user);
  }

  async activeUser(secretCode: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { secretCode },
    });

    if (!user) throw new NotFoundException(ErrorsEnum.NOT_FOUND);
    user.active = true;

    return await this.userRepository.save(user);
  }

  async findForLogin(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where({ email, active: true })
      .addSelect('user.password')
      .getOne();

    if (!user) throw new UnauthorizedException(ErrorsEnum.UNAUTHORIZED);

    return user;
  }
}
