"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchemaZod = exports.userSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchemaZod = zod_1.z.object({
    idUser: zod_1.z.string().refine((value) => {
        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);
    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    name: zod_1.z.string().min(1, "Nombre del usuario es requerido"),
    lastName: zod_1.z.string().min(1, "Apellido del usuario es requerido"),
    codeCountry: zod_1.z.string().min(1, "El código de país es requerido"),
    phoneNumber: zod_1.z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
    username: zod_1.z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    status: zod_1.z.string().min(1, "El estatus del usuario es requerido"),
    hasTwoFactor: zod_1.z.boolean(),
    lastLogin: zod_1.z.string().optional(),
    department: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    roleConfig: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    passwordHistory: zod_1.z
        .array(zod_1.z.string())
        .max(5, {
        message: "El historial no puede exceder 5 contraseñas"
    })
        .optional()
        .default([]),
});
exports.updateUserSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nombre del usuario es requerido").optional(),
    lastName: zod_1.z.string().min(1, "Apellido del usuario es requerido").optional(),
    codeCountry: zod_1.z.string().min(1, "El código de país es requerido").optional(),
    phoneNumber: zod_1.z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }).optional(),
    username: zod_1.z.string().min(6, "El usuario debe tener al menos 6 carácteres").optional(),
    status: zod_1.z.string().min(1, "El estatus del usuario es requerido").optional(),
    hasTwoFactor: zod_1.z.boolean().optional(),
    roleConfig: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    department: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
});
//# sourceMappingURL=user.validation.js.map