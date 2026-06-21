import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import jwksClient, { JwksClient } from 'jwks-rsa';
import { getToken } from '../utils/getToken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly client: JwksClient;

  constructor() {
    this.client = jwksClient({
      jwksUri:
        'http://localhost:8080/realms/corretora/protocol/openid-connect/certs',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = getToken(authHeader);
    const decoded = jwt.decode(token, { complete: true });
    const kid = decoded?.header.kid;

    if (!kid) {
      throw new UnauthorizedException('Token sem kid.');
    }

    const publicKey = await this.validateCertificate(kid);

    try {
      jwt.verify(token, publicKey, {
        issuer: 'http://localhost:8080/realms/corretora',
        audience: 'account',
      });

      return true;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('TOKEN_EXPIRED');
      }

      throw new UnauthorizedException('TOKEN_INVALID');
    }
  }

  private async validateCertificate(kid: string): Promise<string> {
    const key = await this.client.getSigningKey(kid);

    if (!key) {
      throw new UnauthorizedException('Key inválido.');
    }

    return key.getPublicKey();
  }
}
