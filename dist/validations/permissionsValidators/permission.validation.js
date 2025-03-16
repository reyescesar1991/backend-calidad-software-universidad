"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionSchemaZod = exports.createPermissionSchemaZod = void 0;
const zod_1 = require("zod");
exports.createPermissionSchemaZod = zod_1.z.object({
    label: zod_1.z.string().min(1, { message: 'El label es requerido' }),
    permission: zod_1.z.string().min(1, { message: 'El permiso es requerido' }),
    can: zod_1.z.boolean().optional(),
});
exports.updatePermissionSchemaZod = zod_1.z.object({
    label: zod_1.z.string().min(1, { message: 'El label es requerido' }).optional(),
    permission: zod_1.z.string().min(1, { message: 'El permiso es requerido' }).optional(),
    can: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=permission.validation.js.map