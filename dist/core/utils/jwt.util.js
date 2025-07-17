"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidator = void 0;
class JwtValidator {
    // Verificar si el payload contiene rol
    static hasRole(payload) {
        return typeof payload.role === 'string' && payload.role !== '';
    }
    // Validar vigencia del token
    static isValid(payload) {
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    }
    static isValidPreAuth(payload) {
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    }
    // Calcular tiempo restante en segundos
    static getRemainingTime(payload) {
        return payload.exp - Math.floor(Date.now() / 1000);
    }
    // Verificar jerarquía de roles
    static hasMinimumRole(payload, requiredRole) {
        if (!this.hasRole(payload))
            return false;
        // Lógica jerárquica de roles
        const roleHierarchy = ['01', '02', '03', '04']; // 01 = más bajo, 04 = más alto
        return roleHierarchy.indexOf(payload.role) >= roleHierarchy.indexOf(requiredRole);
    }
    // Nuevo: Obtener rol o valor por defecto
    static getRoleOrDefault(payload, defaultRole = '01') {
        return this.hasRole(payload) ? payload.role : defaultRole;
    }
}
exports.JwtValidator = JwtValidator;
//# sourceMappingURL=jwt.util.js.map