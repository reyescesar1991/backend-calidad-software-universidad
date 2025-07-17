"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleConfigSchemaZod = exports.roleConfigSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.roleConfigSchemaZod = zod_1.z.object({
    rolID: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    maxLoginAttempts: zod_1.z.number().gte(2, "El mínimo de intentos es 2"),
    isActive: zod_1.z.boolean().optional(),
    rolName: zod_1.z.string().min(1, "Nombre de rol es requerido"),
});
exports.updateRoleConfigSchemaZod = zod_1.z.object({
    maxLoginAttempts: zod_1.z.number().gte(2, "El mínimo de intentos es 2").optional(),
    rolName: zod_1.z.string().min(1, "Nombre de rol es requerido").optional(),
});
//# sourceMappingURL=roleConfig.validation.js.map