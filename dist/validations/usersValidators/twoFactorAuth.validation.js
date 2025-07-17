"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTwoFactorAuthSchemaZod = exports.twoFactorAuthSchemaZod = void 0;
const zod_1 = require("zod");
exports.twoFactorAuthSchemaZod = zod_1.z.object({
    method: zod_1.z.string().min(1, "Método de autenticación es requerido"),
    isEnabled: zod_1.z.boolean(),
    quantityUsers: zod_1.z.number().gte(0, "El valor mínimo de usuario es cero"),
});
exports.updateTwoFactorAuthSchemaZod = zod_1.z.object({
    method: zod_1.z.string().min(1, "Método de autenticación es requerido").optional(),
});
//# sourceMappingURL=twoFactorAuth.validation.js.map