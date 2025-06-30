// src/core/auth/factories/jwt-payload.factory.ts
import { resolve } from "path";
import { JwtPayload, JwtPreAuthPayload } from "../types";
import {v4 as uuidv4} from 'uuid';
import * as dotenv from 'dotenv';


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

  static createBasePreAuth(username: string, userId : string): JwtPreAuthPayload {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const ONE_MINUTE_IN_SECONDS = 60; // Define 1 minute

    return Object.freeze({
      username,
      userId,
      jti : uuidv4(),
      lat: now,
      exp: now + ONE_MINUTE_IN_SECONDS,
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

  // Crear payload con rol
  static createPreAuthToken(
    username: string,
    userId : string
  ): JwtPreAuthPayload {
    const base = this.createBasePreAuth(username, userId);
    return Object.freeze({
      ...base,
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