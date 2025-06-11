// src/auth/services/token.service.ts
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { JWT_SECRET_TOKEN } from '../../../core/const';
import { JwtPayload } from '../../../core/types';
import { JwtValidator } from '../../../core/utils/jwt.util';
import { JwtPayloadFactory } from '../../../core/factories/jwt-payload.factory';
// Importar la factory

@injectable()
export class TokenService {
  constructor(
    @inject(JWT_SECRET_TOKEN) private readonly secret: string
  ) { }

  generateToken(
    data: Omit<JwtPayload, 'lat' | 'exp'>,
    expiresInSec: number = 3600
  ): string {
    // Usar la factory para crear el payload
    const payload = data.role
      ? JwtPayloadFactory.createWithRole(data.userId, data.role, expiresInSec)
      : JwtPayloadFactory.createBase(data.userId, expiresInSec);

    return sign(payload, this.secret, {
      algorithm: 'HS256'
    });
  }

  verifyToken(token: string): JwtPayload {
    const decoded = verify(token, this.secret) as JwtPayload;

    if (!JwtValidator.isValid(decoded)) {
      throw new Error('Token expirado');
    }

    return decoded;
  }

  refreshToken(token: string, expiresInSec: number = 3600): string {
    const payload = this.verifyToken(token);

    // Usar la factory para crear el nuevo payload
    const newPayload = payload.role
      ? JwtPayloadFactory.createWithRole(payload.userId, payload.role, expiresInSec)
      : JwtPayloadFactory.createBase(payload.userId, expiresInSec);

    return sign(newPayload, this.secret, {
      algorithm: 'HS256'
    });
  }
}