"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplierSchemaZod = exports.supplierSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.supplierSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID de proveedor es requerido"),
    name: zod_1.z.string().min(1, "Nombre de proveedor es requerido"),
    tradeName: zod_1.z.string().min(1, "Nombre comercial del proveedor es requerido"),
    contactPerson: zod_1.z.string().min(1, "Persona de contacto del proveedor es requerido"),
    phoneNumber: zod_1.z.string().min(1, "Teléfono del proveedor es requerido"),
    email: zod_1.z.string().email("Formato de correo del proveedor no es valido"),
    address: zod_1.z.string().min(1, "Dirección del proveedor es requerida"),
    city: zod_1.z.string().min(1, "Ciudad del proveedor es requerido"),
    state: zod_1.z.string().min(1, "Estado del proveedor es requerido"),
    zipCode: zod_1.z.string().min(1, "Código zip del proveedor es requerido"),
    country: zod_1.z.string().min(1, "País del proveedor es requerido"),
    taxId: zod_1.z.string().min(1, "ID fiscal del proveedor es requerido"),
    businessRegistrationNumber: zod_1.z.string().min(1, "Número de registro del comercio del proveedor es requerido"),
    paymentTerm: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    isActive: zod_1.z.boolean().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateSupplierSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nombre de proveedor es requerido").optional(),
    tradeName: zod_1.z.string().min(1, "Nombre comercial del proveedor es requerido").optional(),
    contactPerson: zod_1.z.string().min(1, "Persona de contacto del proveedor es requerido").optional(),
    phoneNumber: zod_1.z.string().min(1, "Teléfono del proveedor es requerido").optional(),
    email: zod_1.z.string().email("Formato de correo del proveedor no es valido").optional(),
    address: zod_1.z.string().min(1, "Dirección del proveedor es requerida").optional(),
    city: zod_1.z.string().min(1, "Ciudad del proveedor es requerido").optional(),
    state: zod_1.z.string().min(1, "Estado del proveedor es requerido").optional(),
    zipCode: zod_1.z.string().min(1, "Código zip del proveedor es requerido").optional(),
    country: zod_1.z.string().min(1, "País del proveedor es requerido").optional(),
    paymentTerm: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
    isActive: zod_1.z.boolean().optional(),
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=supplier.validator.js.map