import { UnauthorizedException } from '@nestjs/common';

export const getToken = (token: string): string => {
  const parts = token.split(' ');

  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }

  throw new UnauthorizedException('Token inválido.');
};
