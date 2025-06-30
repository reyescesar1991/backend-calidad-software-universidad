// src/auth/services/token.service.ts
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { JWT_PREAUTH_SECRET, JWT_SECRET_TOKEN } from '../../../core/const';
import { JwtPayload, JwtPreAuthPayload } from '../../../core/types';
import { JwtValidator } from '../../../core/utils/jwt.util';
import { JwtPayloadFactory } from '../../../core/factories/jwt-payload.factory';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
// Importar la factory

// Cargar variables de entorno
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Constantes reutilizables
const SECRET = process.env.CONNECTION_STRING;

@injectable()
export class TokenService {
  constructor(
    @inject(JWT_SECRET_TOKEN) private readonly secret: string,
    @inject(JWT_PREAUTH_SECRET) private readonly secretPreAuth: string,
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

  generatePreAuthToken(
    username : string,
    userId : string
  ): string {
    // Usar la factory para crear el payload
    const payload = JwtPayloadFactory.createBasePreAuth(username, userId);

    return sign(payload, process.env.JWT_PREAUTH_SECRET, {
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

  verifyPreAuthToken(token: string): JwtPreAuthPayload {
    const decoded = verify(token, this.secretPreAuth) as JwtPreAuthPayload;

    console.log(this.secretPreAuth);
    

    if (!JwtValidator.isValidPreAuth(decoded)) {
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