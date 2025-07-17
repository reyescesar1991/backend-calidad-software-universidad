"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSessionManagementSchemaZod = exports.sessionManagementSchemaZod = void 0;
const zod_1 = require("zod");
exports.sessionManagementSchemaZod = zod_1.z.object({
    userId: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    token: zod_1.z.string(),
    ipAddress: zod_1.z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
        message: "La dirección IP no es válida",
    }),
    userAgent: zod_1.z.string().min(1, "El dispositivo del usuario es requerido"),
    expiresAt: zod_1.z.date()
});
exports.UpdateSessionManagementSchemaZod = zod_1.z.object({
    token: zod_1.z.string(),
    expiresAt: zod_1.z.date(),
});
//# sourceMappingURL=sessionManagement.validation.js.map