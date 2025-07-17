"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWarehouseSchemaZod = exports.warehouseSchemaZod = void 0;
const zod_1 = require("zod");
const maps_1 = require("../../core/maps");
const mongoose_1 = __importDefault(require("mongoose"));
const validCities = Array.from(maps_1.cityMap.values());
exports.warehouseSchemaZod = zod_1.z.object({
    idWarehouse: zod_1.z.string().refine((value) => {
        const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
        return regex.test(value);
    }, (value) => ({
        message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
            `Abreviaturas válidas: ${validCities.join(", ")}`
    })),
    idHeadquarter: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    name: zod_1.z.string().min(1, "Nombre de almacen es requerido"),
    address: zod_1.z.string().min(1, "Dirección de almacen es requerido"),
    city: zod_1.z.string().min(1, "Ciudad del almacen es requerido"),
    state: zod_1.z.string().min(1, "Estado del pais del almacen es requerido"),
    country: zod_1.z.string().min(1, "País del almacen es requerido"),
    capacity: zod_1.z.number().gte(10, "El mínimo de capacidad de un almacen son diez pallets"),
    currentCapacity: zod_1.z.number().gte(0, "El mínimo de capacidad actual de un almacen es cero pallets"),
    unitsPerBox: zod_1.z.literal(15, {
        message: "Las unidades por caja deben ser exactamente 15."
    }).optional(), // Opcional si no siempre es requerido
    boxesPerPallet: zod_1.z.literal(60, {
        message: "Las cajas por pallet deben ser exactamente 60."
    }).optional(), // Opcional si no siempre es requerido
    isActive: zod_1.z.boolean().optional(),
    contactPerson: zod_1.z.string().min(1, "Persona de contacto del almacen es requerida"),
    phoneNumber: zod_1.z.string().regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email: zod_1.z.string().email(),
    notes: zod_1.z.string().optional(),
}).refine((data) => data.currentCapacity <= data.capacity, {
    message: "La capacidad actual no puede ser mayor que la capacidad total",
    path: ["currentCapacity"] // 👈 Indica qué campo muestra el error
});
exports.updateWarehouseSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nombre de almacen es requerido").optional(),
    address: zod_1.z.string().min(1, "Dirección de almacen es requerido").optional(),
    city: zod_1.z.string().min(1, "Ciudad del almacen es requerido").optional(),
    state: zod_1.z.string().min(1, "Estado del pais del almacen es requerido").optional(),
    contactPerson: zod_1.z.string().min(1, "Persona de contacto del almacen es requerida").optional(),
    phoneNumber: zod_1.z.string().regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email: zod_1.z.string().email().optional(),
    notes: zod_1.z.string().optional().optional(),
});
//# sourceMappingURL=warehouse.validation.js.map