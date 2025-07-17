"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleFilterSchema = void 0;
const zod_1 = require("zod");
exports.RoleFilterSchema = zod_1.z.object({
    idRole: zod_1.z.string().min(1, "ID del rol es demasiado corto").optional(),
    isActive: zod_1.z.boolean().optional(),
    name: zod_1.z.string().min(2, "Nombre de rol muy corto").optional(),
    label: zod_1.z.string().min(2, "Etiqueta de rol es muy corta").optional(),
    description: zod_1.z.string().min(1, "Descripción del rol es muy corta").optional(),
    isDefault: zod_1.z.boolean().optional(),
}).strict();
//# sourceMappingURL=roleFormatValidator.js.map