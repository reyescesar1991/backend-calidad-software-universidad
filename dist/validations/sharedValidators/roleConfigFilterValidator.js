"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleConfigFilterSchema = void 0;
const zod_1 = require("zod");
exports.RoleConfigFilterSchema = zod_1.z.object({
    rolName: zod_1.z.string().min(1, "Nombre del rol es demasiado corto").optional(),
    maxLoginAttempts: zod_1.z.number().optional(),
    isActive: zod_1.z.boolean().optional(),
}).strict();
//# sourceMappingURL=roleConfigFilterValidator.js.map