"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFilterSchemaZod = exports.RouteFilterSchemaZod = exports.SubrouteFilterSchema = void 0;
const zod_1 = require("zod");
const regex_1 = require("../../core/regex");
exports.SubrouteFilterSchema = zod_1.z.object({
    path: zod_1.z.string().regex(regex_1.pathRegex, "Formato de ruta inválido").optional(),
    active: zod_1.z.boolean().optional(),
    name: zod_1.z.string().min(2, "Nombre muy corto").optional(),
    mainRoute: zod_1.z.string().min(1, "Ruta principal requerida").optional()
}).strict();
exports.RouteFilterSchemaZod = zod_1.z.object({
    path: zod_1.z.string().regex(regex_1.pathRegex, "Formato de ruta inválido").optional(),
    active: zod_1.z.boolean().optional(),
    name: zod_1.z.string().min(2, "Nombre muy corto").optional(),
    icon: zod_1.z.string().min(1, "Ruta principal requerida").optional()
}).strict();
exports.ModuleFilterSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(1, "El ID es muy corto").optional(),
    active: zod_1.z.boolean().optional(),
    title: zod_1.z.string().min(2, "Titulo de módulo muy corto").optional(),
}).strict();
//# sourceMappingURL=routeFormatValidator.js.map