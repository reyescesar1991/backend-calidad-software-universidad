"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelSchema = void 0;
const zod_1 = require("zod");
exports.labelSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, { message: 'El label es requerido' })
});
//# sourceMappingURL=labelSchema.zod.js.map