// src/auth/services/token.service.ts
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from '../../../core/types';
import { inject, injectable } from 'tsyringe';
import { JWT_SECRET_TOKEN } from '../../../core/const';
import { JwtValidator } from '../../../core/utils/jwt.util';

@injectable()
export class TokenService {
  constructor(
    @inject(JWT_SECRET_TOKEN) private readonly secret: string
  ) {}

  generateToken(
    data: Omit<JwtPayload, 'lat' | 'exp'>,
    expiresInSec: number = 3600
  ): string {
    const now = Math.floor(Date.now() / 1000);
    
    const payload: JwtPayload = {
      userId: data.userId,
      role: data.role,
      lat: now,
      exp: now + expiresInSec
    };

    return sign(payload, this.secret, {
      algorithm: 'HS256'
    });
  }

  verifyToken(token: string): JwtPayload {
    const decoded = verify(token, this.secret) as JwtPayload;
    
    // Verificar usando nuestro validador
    if (!JwtValidator.isValid(decoded)) {
      throw new Error('Token expirado');
    }
    
    return decoded;
  }

  refreshToken(token: string, expiresInSec: number = 3600): string {
    const payload = this.verifyToken(token);
    
    // Generar nuevo token manteniendo el rol
    return this.generateToken(
      {
        userId: payload.userId,
        role: payload.role // Mantiene el rol original
      },
      expiresInSec
    );
  }
}