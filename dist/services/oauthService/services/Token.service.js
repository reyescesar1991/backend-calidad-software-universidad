"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
// src/auth/services/token.service.ts
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const const_1 = require("../../../core/const");
const jwt_util_1 = require("../../../core/utils/jwt.util");
const jwt_payload_factory_1 = require("../../../core/factories/jwt-payload.factory");
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
// Importar la factory
// Cargar variables de entorno
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
// Constantes reutilizables
const SECRET = process.env.CONNECTION_STRING;
let TokenService = class TokenService {
    secret;
    secretPreAuth;
    constructor(secret, secretPreAuth) {
        this.secret = secret;
        this.secretPreAuth = secretPreAuth;
    }
    generateToken(data, expiresInSec = 3600) {
        // Usar la factory para crear el payload
        const payload = data.role
            ? jwt_payload_factory_1.JwtPayloadFactory.createWithRole(data.userId, data.role, expiresInSec)
            : jwt_payload_factory_1.JwtPayloadFactory.createBase(data.userId, expiresInSec);
        return (0, jsonwebtoken_1.sign)(payload, this.secret, {
            algorithm: 'HS256'
        });
    }
    generatePreAuthToken(username, userId) {
        // Usar la factory para crear el payload
        const payload = jwt_payload_factory_1.JwtPayloadFactory.createBasePreAuth(username, userId);
        return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_PREAUTH_SECRET, {
            algorithm: 'HS256'
        });
    }
    verifyToken(token) {
        const decoded = (0, jsonwebtoken_1.verify)(token, this.secret);
        if (!jwt_util_1.JwtValidator.isValid(decoded)) {
            throw new Error('Token expirado');
        }
        return decoded;
    }
    verifyPreAuthToken(token) {
        const decoded = (0, jsonwebtoken_1.verify)(token, this.secretPreAuth);
        console.log(this.secretPreAuth);
        if (!jwt_util_1.JwtValidator.isValidPreAuth(decoded)) {
            throw new Error('Token expirado');
        }
        return decoded;
    }
    refreshToken(token, expiresInSec = 3600) {
        const payload = this.verifyToken(token);
        // Usar la factory para crear el nuevo payload
        const newPayload = payload.role
            ? jwt_payload_factory_1.JwtPayloadFactory.createWithRole(payload.userId, payload.role, expiresInSec)
            : jwt_payload_factory_1.JwtPayloadFactory.createBase(payload.userId, expiresInSec);
        return (0, jsonwebtoken_1.sign)(newPayload, this.secret, {
            algorithm: 'HS256'
        });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(const_1.JWT_SECRET_TOKEN)),
    __param(1, (0, tsyringe_1.inject)(const_1.JWT_PREAUTH_SECRET)),
    __metadata("design:paramtypes", [String, String])
], TokenService);
//# sourceMappingURL=Token.service.js.map