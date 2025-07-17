"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.roleSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.roleSchema = zod_1.z.object({
    idRole: zod_1.z.string().min(1, { message: 'ID de rol es requerido' }),
    name: zod_1.z.string().min(1, { message: 'Nombre del rol es requerido' }),
    label: zod_1.z.string().min(1, { message: 'La etiqueta de rol es requerida' }),
    permissions: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, {
        message: "Debe ser un ObjectId de Mongoose",
    })).optional(),
    permissionsSecurity: zod_1.z.array(zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, {
        message: "Debe ser un ObjectId de Mongoose",
    })).optional(),
    description: zod_1.z.string().min(1, { message: 'La descripción es requerida' }),
    isActive: zod_1.z.boolean(),
    isDefault: zod_1.z.boolean(),
    managePermissions: zod_1.z.boolean().optional(),
});
exports.updateRoleSchema = zod_1.z.object({
    idRole: zod_1.z
        .string()
        .min(1, { message: "ID de rol es requerido si se envía" })
        .optional(),
    name: zod_1.z
        .string()
        .min(1, { message: "Nombre del rol es requerido si se envía" })
        .optional(),
    label: zod_1.z
        .string()
        .min(1, { message: "La etiqueta de rol es requerida si se envía" })
        .optional(),
    description: zod_1.z
        .string()
        .min(1, { message: "La descripción es requerida si se envía" })
        .optional(),
}).partial();
//# sourceMappingURL=role.validation.js.map