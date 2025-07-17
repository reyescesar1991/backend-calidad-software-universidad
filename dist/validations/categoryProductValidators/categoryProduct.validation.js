"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryProductZodSchema = exports.categoryProductZodSchema = void 0;
const zod_1 = require("zod");
exports.categoryProductZodSchema = zod_1.z.object({
    idCategory: zod_1.z.string().min(1, "ID de categoria de producto es requerido"),
    label: zod_1.z.string().min(1, "Etiqueta de categoria es requerida"),
    name: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    isVisible: zod_1.z.boolean().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateCategoryProductZodSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, "Etiqueta de categoria es requerida").optional(),
    name: zod_1.z.string().optional(),
    slug: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
//# sourceMappingURL=categoryProduct.validation.js.map