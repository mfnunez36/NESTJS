import { ConfigService } from '@nestjs/config';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/entities';

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = UserEntity.getRepository();

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', { email: config.get('USER_DEFAULT_EMAIL') })
    .getOne();

  if (!defaultUser) {
    const userAdmin = {
      name: config.get('USER_DEFAULT_NAME'),
      lastname: config.get('USER_DEFAULT_LASTNAME'),
      username: config.get('USER_DEFAULT_USERNAME'),
      email: config.get('USER_DEFAULT_EMAIL'),
      password: await hash(config.get('USER_DEFAULT_PASSWORD'), 10),
      secretCode: await uuidv4(),
      roles: ['USER_ADMIN'],
      active: true,
    };

    return await userRepository.save(userAdmin);
  }
};
