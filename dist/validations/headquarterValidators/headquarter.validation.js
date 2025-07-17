"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeadquarterSchemaZod = exports.headquarterSchemaZod = void 0;
const zod_1 = require("zod");
exports.headquarterSchemaZod = zod_1.z.object({
    idHeadquarter: zod_1.z.string().min(1, "ID de sede es requerido"),
    label: zod_1.z.string().min(1, "Etiqueta de sede es requerida"),
    name: zod_1.z.string().min(1, "El nombre de sede es requerido"),
    address: zod_1.z.string().min(1, "La dirección de sede es requerida"),
    geoLocation: zod_1.z.object({
        city: zod_1.z.string().min(1, "La ciudad de la sede es requerida"),
        state: zod_1.z.string().min(1, "Estado de sede es requerido"),
        zipCode: zod_1.z.string().min(1, "Código Zip es requerido"),
    }),
    phoneNumber: zod_1.z.string().min(1, "Telefono de sede es requerido").regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email: zod_1.z.string().min(1, "Email de sede es requerido").email("Formato de correo de sede no es valido"),
    isActive: zod_1.z.boolean(),
});
exports.updateHeadquarterSchemaZod = zod_1.z.object({
    label: zod_1.z.string().min(1, "Etiqueta de sede es requerida").optional(),
    name: zod_1.z.string().min(1, "El nombre de sede es requerido").optional(),
    phoneNumber: zod_1.z.string().min(1, "Telefono de sede es requerido").regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email: zod_1.z.string().min(1, "Email de sede es requerido").email("Formato de correo de sede no es valido").optional(),
});
//# sourceMappingURL=headquarter.validation.js.map