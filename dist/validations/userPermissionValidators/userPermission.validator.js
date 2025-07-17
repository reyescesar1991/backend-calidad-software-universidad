"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPermissionSchemaZod = exports.userPermissionSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userPermissionSchemaZod = zod_1.z.object({
    idUser: zod_1.z.string().min(1, "ID de user es requerido"),
    roleId: zod_1.z.string().min(1, "ID de role es requerido"),
    customPermissions: zod_1.z.array(// 👈 Definición directa
    zod_1.z.object({
        permissionId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
        can: zod_1.z.boolean({
            required_error: "El campo 'can' es requerido",
            invalid_type_error: "'can' debe ser verdadero o falso"
        }),
        permissionLabel: zod_1.z.string().min(1, "Label del permiso es requerido"),
    }))
        .refine(permissions => {
        const ids = permissions.map(p => p.permissionId);
        return new Set(ids).size === ids.length; // Validar duplicados
    }, "No se permiten permisos repetidos")
        .default([]),
});
exports.UpdateUserPermissionSchemaZod = zod_1.z.object({
    roleId: zod_1.z.string().min(1, "ID de role es requerido").optional(),
    customPermissions: zod_1.z.array(// 👈 Definición directa
    zod_1.z.object({
        permissionId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
        can: zod_1.z.boolean({
            required_error: "El campo 'can' es requerido",
            invalid_type_error: "'can' debe ser verdadero o falso"
        }),
        permissionLabel: zod_1.z.string().min(1, "Label del permiso es requerido"),
    }))
        .refine(permissions => {
        const ids = permissions.map(p => p.permissionId);
        return new Set(ids).size === ids.length; // Validar duplicados
    }, "No se permiten permisos repetidos")
        .default([]).optional(),
});
//# sourceMappingURL=userPermission.validator.js.map