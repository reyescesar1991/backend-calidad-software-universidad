"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleUpdateSchemaZod = exports.moduleSchemaZod = exports.routeUpdateSchemaZod = exports.routeSchemaZod = exports.subrouteUpdateSchemaZod = exports.subrouteSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const pathRegex = /^\/[a-z0-9_-]+(\/[a-z0-9_-]+)*\/?$/i;
exports.subrouteSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(2, "ID de subruta inválido"),
    name: zod_1.z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
    path: zod_1.z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta inválido. Ejemplo válido: /dashboard/productos"),
    active: zod_1.z.boolean(),
    permissionKey: zod_1.z.string().min(1, "Permiso asociado es requerido"),
    mainRoute: zod_1.z.string().min(1, "Ruta padre es requerida"),
    // parentId: z.instanceof(mongoose.Types.ObjectId),
});
exports.subrouteUpdateSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(2, "Nombre debe tener al menos 2 caracteres").optional(),
    path: zod_1.z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta inválido. Ejemplo válido: /dashboard/productos").optional(),
    active: zod_1.z.boolean().optional(),
    mainRoute: zod_1.z.string().min(1, "Ruta padre es requerida").optional(),
});
exports.routeSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(2, "ID de ruta inválido"),
    idModule: zod_1.z.string().min(1, "ID de módulo padre es requerido"),
    name: zod_1.z.string().min(2, "Nombre de ruta debe tener al menos 2 caracteres"),
    path: zod_1.z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta no valido. Ejemplo: /dashboard/productos"),
    icon: zod_1.z.string().min(1, "Ícono es requerido"),
    active: zod_1.z.boolean(),
    subroutes: zod_1.z.array(
    // Validar que cada elemento sea una instancia de ObjectId
    zod_1.z.instanceof(mongoose_1.default.Types.ObjectId, {
        message: "Debe ser un ObjectId válido",
    }))
});
exports.routeUpdateSchemaZod = zod_1.z.object({
    idModule: zod_1.z.string().min(1, "ID de módulo padre es requerido").optional(),
    name: zod_1.z.string().min(2, "Nombre de ruta debe tener al menos 2 caracteres").optional(),
    path: zod_1.z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta no valido. Ejemplo: /dashboard/productos").optional(),
    icon: zod_1.z.string().min(1, "Ícono es requerido").optional(),
    active: zod_1.z.boolean().optional(),
});
exports.moduleSchemaZod = zod_1.z.object({
    id: zod_1.z.string().min(2, { message: 'El id debe ser un nombre valido' }),
    title: zod_1.z.string().min(1, { message: 'Titulo es requerido' }),
    active: zod_1.z.boolean(),
    routes: zod_1.z.array(
    // Validar que cada elemento sea una instancia de ObjectId
    zod_1.z.instanceof(mongoose_1.default.Types.ObjectId, {
        message: "Debe ser un ObjectId válido",
    }))
});
exports.moduleUpdateSchemaZod = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Titulo es requerido' }).optional(),
});
//# sourceMappingURL=menu.validation.js.map