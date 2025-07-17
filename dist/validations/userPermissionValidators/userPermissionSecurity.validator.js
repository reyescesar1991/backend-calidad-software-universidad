"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPermissionSecuritySchemaZod = exports.userPermissionSecuritySchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userPermissionSecuritySchemaZod = zod_1.z.object({
    idUser: zod_1.z.string().min(1, "ID de user es requerido"),
    idRol: zod_1.z.string().min(1, "ID de rol es requerido"),
    customPermissionsSecurity: zod_1.z.array(// 👈 Definición directa
    zod_1.z.object({
        permissionSecurityId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
        can: zod_1.z.boolean({
            required_error: "El campo 'can' es requerido",
            invalid_type_error: "'can' debe ser verdadero o falso"
        }),
        permissionKey: zod_1.z.string().min(1, "Label del permiso es requerido"),
    }))
        .refine(permissions => {
        const ids = permissions.map(p => p.permissionSecurityId);
        return new Set(ids).size === ids.length; // Validar duplicados
    }, "No se permiten permisos repetidos")
});
exports.UpdateUserPermissionSecuritySchemaZod = zod_1.z.object({
    idRol: zod_1.z.string().min(1, "ID de rol es requerido").optional(),
    customPermissionsSecurity: zod_1.z.array(// 👈 Definición directa
    zod_1.z.object({
        permissionSecurityId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
        can: zod_1.z.boolean({
            required_error: "El campo 'can' es requerido",
            invalid_type_error: "'can' debe ser verdadero o falso"
        }),
        permissionKey: zod_1.z.string().min(1, "Label del permiso es requerido"),
    }))
        .refine(permissions => {
        const ids = permissions.map(p => p.permissionSecurityId);
        return new Set(ids).size === ids.length; // Validar duplicados
    }, "No se permiten permisos repetidos").optional()
});
//# sourceMappingURL=userPermissionSecurity.validator.js.map