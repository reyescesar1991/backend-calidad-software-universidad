"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentTermSchemaZod = exports.paymentTermSchemaZod = void 0;
const zod_1 = require("zod");
exports.paymentTermSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID de término de pago es requerido"),
    name: zod_1.z.string().min(1, "Nombre del término de pago es requerido"),
    description: zod_1.z.string().min(1, "Descripción del término de pago es requerido"),
    daysToPay: zod_1.z.number().gte(0, "Dia mínimo de pago es uno"),
    discount: zod_1.z.number().optional(),
    isActive: zod_1.z.boolean()
});
exports.updatePaymentTermSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nombre del término de pago es requerido").optional(),
    description: zod_1.z.string().min(1, "Descripción del término de pago es requerido").optional(),
    daysToPay: zod_1.z.number().gte(0, "Dia mínimo de pago es uno").optional(),
    discount: zod_1.z.number().optional(),
    isActive: zod_1.z.boolean().optional()
});
//# sourceMappingURL=paymentTerm.validation.js.map