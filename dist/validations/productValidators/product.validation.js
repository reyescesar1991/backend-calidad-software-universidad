"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchemaZod = exports.productSchemaZod = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../core/enums");
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchemaZod = zod_1.z.object({
    idProduct: zod_1.z.string().refine((value) => {
        const regex = /^PROD\d{6}$/;
        return regex.test(value);
    }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"),
    name: zod_1.z.string().min(1, "Nombre de producto es requerido"),
    description: zod_1.z.string().optional(),
    sku: zod_1.z.string().refine((value) => {
        const regex = /^(FRU|VER|LAC|CAR|PAN|BEB|CON|ENL|LIM|OTR)-[a-zA-Z0-9]+-\d{8}$/;
        return regex.test(value);
    }, `El SKU debe tener el formato: [Categoría]-[Marca]-[8 dígitos] (ej: FRU-MARCA001-12345678). Las categorías válidas son: ${Object.keys(enums_1.CategoryProductEnum).join(", ")}`),
    barcode: zod_1.z.string().refine((value) => {
        const regex = /^\d{8}$/;
        return regex.test(value);
    }, "El código de barra debe tener 8 digitos númericos"),
    categoryId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    supplierId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    brand: zod_1.z.string().min(1, "Marca de producto es requerido"),
    purchasePrice: zod_1.z.number().gte(0.01, "Precio mínimo de compra es 0.11$"),
    sellingPrice: zod_1.z.number().gte(0.1, "Precio mínimo de venta es de 0.1$"),
    currency: zod_1.z.string().min(1, "Tipo de moneda del producto es requerido"),
    minimumStockLevel: zod_1.z.number().gte(1, "El mínimo de stock para alarma para un producto es 1"),
    maximumStockLevel: zod_1.z.number(),
    unitOfMeasure: zod_1.z.string().min(1, "Unidad de medida es requerida"),
    imageUrl: zod_1.z.string().optional(),
    updatedAt: zod_1.z.date().refine((date) => {
        const now = new Date();
        return date <= now;
    }, {
        message: "La fecha de actualización no puede ser posterior a la fecha actual.",
    }).optional(),
    isActive: zod_1.z.boolean().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateProductSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nombre de producto es requerido").optional(),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
    supplierId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }).optional(),
    brand: zod_1.z.string().min(1, "Marca de producto es requerido").optional(),
    purchasePrice: zod_1.z.number().gte(0.01, "Precio mínimo de compra es 0.11$").optional(),
    sellingPrice: zod_1.z.number().gte(0.1, "Precio mínimo de venta es de 0.1$").optional(),
    currency: zod_1.z.string().min(1, "Tipo de moneda del producto es requerido").optional(),
    minimumStockLevel: zod_1.z.number().gte(1, "El mínimo de stock para alarma para un producto es 1").optional(),
    maximumStockLevel: zod_1.z.number().optional(),
    unitOfMeasure: zod_1.z.string().min(1, "Unidad de medida es requerida").optional(),
    imageUrl: zod_1.z.string().optional().optional(),
    notes: zod_1.z.string().optional().optional(),
});
//# sourceMappingURL=product.validation.js.map