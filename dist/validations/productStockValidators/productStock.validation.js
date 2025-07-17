"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStockSchemaZod = exports.productStockSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const maps_1 = require("../../core/maps");
const validCities = Array.from(maps_1.cityMap.values());
exports.productStockSchemaZod = zod_1.z.object({
    productId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
    productCustomId: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    warehouseId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine((val) => val instanceof mongoose_1.default.Types.ObjectId, { message: "ID de almacén inválido" }),
    warehouseCustomId: zod_1.z.string().refine((value) => {
        const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
        return regex.test(value);
    }, (value) => ({
        message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
            `Abreviaturas válidas: ${validCities.join(", ")}`
    })),
    quantity: zod_1.z.number().gte(0, "la cantidad mínima de registro es de cero"),
    statusInWarehouse: zod_1.z.boolean().optional(),
});
exports.updateProductStockSchemaZod = zod_1.z.object({
    quantity: zod_1.z.number().gte(0, "la cantidad mínima de registro es de cero"),
});
//# sourceMappingURL=productStock.validation.js.map