"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockByStatusResponse = exports.amountTotalStockByProductByWarehouseResponse = exports.amountTotalStockByProductResponse = exports.warehouseTotalMonetaryValueResponse = exports.stockTotalByProductResponse = exports.stockByWarehouseResponse = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const maps_1 = require("../../core/maps");
const validCities = Array.from(maps_1.cityMap.values());
exports.stockByWarehouseResponse = zod_1.z.object({
    quantity: zod_1.z.number(),
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    productName: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    warehouseId: zod_1.z.string().refine((value) => {
        const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
        return regex.test(value);
    }, (value) => ({
        message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
            `Abreviaturas válidas: ${validCities.join(", ")}`
    })),
    warehouseName: zod_1.z.string().min(1, "Nombre de almacen es requerido"),
});
exports.stockTotalByProductResponse = zod_1.z.object({
    productId: zod_1.z.instanceof(mongoose_1.default.Schema.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Schema.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    productName: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    quantity: zod_1.z.number()
});
// Define este nuevo esquema Zod en un archivo dto, por ejemplo, warehouse-total-monetary-value-response.dto.ts
exports.warehouseTotalMonetaryValueResponse = zod_1.z.object({
    warehouseId: zod_1.z.string().refine((value) => {
        const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
        return regex.test(value);
    }, (value) => ({
        message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
            `Abreviaturas válidas: ${validCities.join(", ")}`
    })),
    warehouseName: zod_1.z.string().min(1, "Nombre de almacen es requerido"),
    totalMonetaryValue: zod_1.z.number(), // Este será el monto total de todos los productos
});
exports.amountTotalStockByProductResponse = zod_1.z.object({
    productId: zod_1.z.instanceof(mongoose_1.default.Schema.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Schema.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    productName: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    totalAmount: zod_1.z.number(),
});
exports.amountTotalStockByProductByWarehouseResponse = zod_1.z.object({
    productId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(// Usamos mongoose.Types.ObjectId para la instancia
    (val) => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    productName: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    totalAmount: zod_1.z.number().min(0, "El monto total no puede ser negativo"), // Añadido min(0) por lógica de negocio
    warehouseId: zod_1.z.string().refine((value) => {
        const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
        return regex.test(value);
    }, (value) => ({
        message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
            `Abreviaturas válidas: ${validCities.join(", ")}`
    })),
    warehouseName: zod_1.z.string().min(1, "Nombre de almacen es requerido"),
});
// Define este nuevo esquema Zod en un archivo dto, por ejemplo, warehouse-total-monetary-value-response.dto.ts
exports.stockByStatusResponse = zod_1.z.object({
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    productName: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    quantity: zod_1.z.number(),
    status: zod_1.z.string(),
});
//# sourceMappingURL=product.responses.js.map