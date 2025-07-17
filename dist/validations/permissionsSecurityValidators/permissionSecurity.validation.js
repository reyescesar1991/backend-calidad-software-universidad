"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionSecurityZodSchema = exports.permissionSecurityZodSchema = void 0;
const zod_1 = require("zod");
exports.permissionSecurityZodSchema = zod_1.z.object({
    can: zod_1.z.boolean(),
    label: zod_1.z.string().min(1, "Etiqueta del permiso de seguridad es requerido"),
    permission: zod_1.z.string().min(1, "Permiso es requerido"),
    id: zod_1.z.string().min(1, "ID de permiso de seguridad es requerido"),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    isSystemDefined: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updatePermissionSecurityZodSchema = zod_1.z.object({
    can: zod_1.z.boolean().optional(),
    label: zod_1.z.string().min(1, "Etiqueta del permiso de seguridad es requerido").optional(),
    id: zod_1.z.string().min(1, "ID de permiso de seguridad es requerido").optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    isSystemDefined: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=permissionSecurity.validation.js.map