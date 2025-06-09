// src/core/auth/util/jwt.util.ts
import { JwtPayload } from "../types";

export class JwtValidator {
  // Verificar si el payload contiene rol
  static hasRole(payload: JwtPayload): boolean {
    return typeof payload.role === 'string' && payload.role !== '';
  }

  // Validar vigencia del token
  static isValid(payload: JwtPayload): boolean {
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }

  // Calcular tiempo restante en segundos
  static getRemainingTime(payload: JwtPayload): number {
    return payload.exp - Math.floor(Date.now() / 1000);
  }

  // Verificar jerarquía de roles
  static hasMinimumRole(
    payload: JwtPayload, 
    requiredRole: string
  ): boolean {
    if (!this.hasRole(payload)) return false;
    
    // Lógica jerárquica de roles
    const roleHierarchy = ['01', '02', '03', '04']; // 01 = más bajo, 04 = más alto
    return roleHierarchy.indexOf(payload.role!) >= roleHierarchy.indexOf(requiredRole);
  }

  // Nuevo: Obtener rol o valor por defecto
  static getRoleOrDefault(payload: JwtPayload, defaultRole = '01'): string {
    return this.hasRole(payload) ? payload.role! : defaultRole;
  }
}