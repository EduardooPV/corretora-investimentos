import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { getToken } from '../utils/getToken';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { KeycloakPayload } from '../types/roles.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = getToken(authHeader);
    const decoded = jwt.decode(token, { complete: true });

    const payload = decoded?.payload as KeycloakPayload;
    const roles = payload?.realm_access?.roles ?? [];

    const hasRole = requiredRoles.some((role) => roles?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Acesso negado.');
    }

    return true;
  }
}
