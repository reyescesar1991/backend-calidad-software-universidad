// src/core/types.ts
export interface JwtPayload {
  userId: string;
  role?: string; // Rol opcional
  lat: number;   // issuedAt (timestamp)
  exp: number;   // expiration (timestamp)
  jti: string;
}

export interface JwtPreAuthPayload {
  username: string;
  userId : string,
  lat: number;   // issuedAt (timestamp)
  exp: number;   // expiration (timestamp)
  jti: string;
}

export type JwtTokenData = {
  userId: string;
  role?: string; // Nuevo campo para el rol
};