"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayloadFactory = void 0;
const uuid_1 = require("uuid");
class JwtPayloadFactory {
    // Crear payload base (sin rol)
    static createBase(userId, expiresInSec) {
        const now = Math.floor(Date.now() / 1000);
        return Object.freeze({
            userId,
            jti: (0, uuid_1.v4)(),
            lat: now,
            exp: now + expiresInSec
        });
    }
    static createBasePreAuth(username, userId) {
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const ONE_MINUTE_IN_SECONDS = 60; // Define 1 minute
        return Object.freeze({
            username,
            userId,
            jti: (0, uuid_1.v4)(),
            lat: now,
            exp: now + ONE_MINUTE_IN_SECONDS,
        });
    }
    // Crear payload con rol
    static createWithRole(userId, role, expiresInSec) {
        const base = this.createBase(userId, expiresInSec);
        return Object.freeze({
            ...base,
            role
        });
    }
    // Crear payload con rol
    static createPreAuthToken(username, userId) {
        const base = this.createBasePreAuth(username, userId);
        return Object.freeze({
            ...base,
        });
    }
    // Nuevo: Crear desde token (para refresh)
    static createFromToken(tokenPayload, expiresInSec) {
        return Object.freeze({
            userId: tokenPayload.userId,
            role: tokenPayload.role,
            jti: (0, uuid_1.v4)(),
            lat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + expiresInSec
        });
    }
}
exports.JwtPayloadFactory = JwtPayloadFactory;
//# sourceMappingURL=jwt-payload.factory.js.map