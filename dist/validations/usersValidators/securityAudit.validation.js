"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSecurityAuditSchemaZod = exports.securityAuditSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.securityAuditSchemaZod = zod_1.z.object({
    userId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    loginAttempts: zod_1.z.number().gte(0, "El mínimo de intentos de login es de cero").max(3, "El usuario puede tener hasta 3 fallos de intento de login"),
    secondFactorAttempts: zod_1.z.number().gte(0, "El mínimo de intentos de segundo factor es de cero").max(3, "El usuario puede tener hasta 3 fallos de intento de segundo factor"),
    lastFailedLogin: zod_1.z.date().optional(),
    twoFactorVerifiedUntil: zod_1.z.date().optional(),
});
exports.updateSecurityAuditSchemaZod = zod_1.z.object({
    lastFailedLogin: zod_1.z.date().optional(),
    twoFactorVerifiedUntil: zod_1.z.date().optional(),
});
//# sourceMappingURL=securityAudit.validation.js.map