import { RolesBuilder } from 'nest-access-control';
import { AppRoles } from './common/enum';

export const roles: RolesBuilder = new RolesBuilder();

roles
  // GENERAL
  .grant(AppRoles.USER_GENERAL)
  .updateOwn([AppRoles.USER_RESOURCE])
  .createOwn([AppRoles.USER_RESOURCE])
  // ADMIN
  .grant(AppRoles.USER_ADMIN)
  .createAny([AppRoles.USER_RESOURCE])
  .updateAny([AppRoles.USER_RESOURCE])
  .deleteAny([AppRoles.USER_RESOURCE]);
