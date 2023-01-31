import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/guards';

export const Auth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard, ACGuard), ApiBearerAuth());
};
