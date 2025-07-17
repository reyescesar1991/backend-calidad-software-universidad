"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFilterSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserFilterSchema = zod_1.z.object({
    idUser: zod_1.z.string().min(1, "ID del usuario es demasiado corto").optional(),
    name: zod_1.z.string().min(2, "Nombre de usuario muy corto").optional(),
    lastName: zod_1.z.string().min(2, "Apellido de usuario es muy corto").optional(),
    codeCountry: zod_1.z.string().min(2, "Código de pais demasiado corto").optional(),
    phoneNumber: zod_1.z.string().min(1, "Telefono del usuario es requerido").regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email: zod_1.z.string().min(1, "Email del usuario es requerido").email("Formato de correo del usuario no es valido").optional(),
    username: zod_1.z.string().min(2, "Nombre de usuario demasiado corto").optional(),
    status: zod_1.z.string().min(2, "Estatus del usuario es requerido").optional(),
    hasTwoFactor: zod_1.z.boolean().optional(),
    department: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
    roleConfig: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
}).strict();
//# sourceMappingURL=userFilterValidator.js.map