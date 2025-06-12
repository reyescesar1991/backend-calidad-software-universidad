// src/core/auth/factories/jwt-payload.factory.ts
import { JwtPayload } from "../types";
import {v4 as uuidv4} from 'uuid';

export class JwtPayloadFactory {
  // Crear payload base (sin rol)
  static createBase(userId: string, expiresInSec: number): JwtPayload {
    const now = Math.floor(Date.now() / 1000);
    return Object.freeze({
      userId,
      jti : uuidv4(),
      lat: now,
      exp: now + expiresInSec
    });
  }

  // Crear payload con rol
  static createWithRole(
    userId: string,
    role: string,
    expiresInSec: number,
  ): JwtPayload {
    const base = this.createBase(userId, expiresInSec);
    return Object.freeze({
      ...base,
      role
    });
  }
  
  // Nuevo: Crear desde token (para refresh)
  static createFromToken(
    tokenPayload: JwtPayload,
    expiresInSec: number
  ): JwtPayload {
    return Object.freeze({
      userId: tokenPayload.userId,
      role: tokenPayload.role,
      jti : uuidv4(),
      lat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expiresInSec
    });
  }
}