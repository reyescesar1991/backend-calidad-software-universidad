"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadquarterFilterSchema = void 0;
const zod_1 = require("zod");
exports.HeadquarterFilterSchema = zod_1.z.object({
    idHeadquarter: zod_1.z.string().min(1, "ID de sede es requerido").optional(),
    label: zod_1.z.string().min(1, "Etiqueta de sede es requerida").optional(),
    name: zod_1.z.string().min(1, "El nombre de sede es requerido").optional(),
    address: zod_1.z.string().min(1, "La dirección de sede es requerida").optional(),
    geoLocation: zod_1.z.object({
        city: zod_1.z.string().min(1, "La ciudad de la sede es requerida").optional(),
        state: zod_1.z.string().min(1, "Estado de sede es requerido").optional(),
        zipCode: zod_1.z.string().min(1, "Código Zip es requerido").optional(),
    }).optional(),
    phoneNumber: zod_1.z.string().min(1, "Telefono de sede es requerido").regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email: zod_1.z.string().min(1, "Email de sede es requerido").email("Formato de correo de sede no es valido").optional(),
    isActive: zod_1.z.boolean().optional(),
}).strict();
//# sourceMappingURL=headquarterFilterValidator.js.map