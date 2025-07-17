"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartmentSchemaZod = exports.departmentSchemaZod = void 0;
const zod_1 = require("zod");
const maps_1 = require("../../core/maps");
const mongoose_1 = __importDefault(require("mongoose"));
const validAbbreviations = Array.from(maps_1.departmentAbbreviationsMap.values());
exports.departmentSchemaZod = zod_1.z.object({
    idDepartment: zod_1.z.string().min(1, "ID de departamento es requerido").refine((value) => {
        // Verificar formato: [Abreviatura][DosDígitos]
        const regex = /^([A-Za-z]+)(\d{2})$/;
        const match = RegExp(regex).exec(value);
        if (!match)
            return false; // Formato incorrecto
        const abbreviation = match[1]; // Parte alfabética (ej: "CMP")
        console.log(match);
        return validAbbreviations.includes(abbreviation); // Validar abreviatura
    }, (value) => ({
        message: `Formato inválido. Debe ser: [Abreviatura][DosDígitos] (ej: ${validAbbreviations[0]}01). ` +
            `Abreviaturas válidas: ${validAbbreviations.join(", ")}`
    })),
    label: zod_1.z.string().min(1, "Etiqueta de departamento es requerida"),
    name: zod_1.z.string().min(1, "Nombre de departamento es requerido"),
    description: zod_1.z.string().min(1, "Descripción de departamento es requerida").optional(),
    headquartersId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    headquartersName: zod_1.z.string().min(1, "Nombre de sede del departamento es requerido"),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateDepartmentSchemaZod = zod_1.z.object({
    label: zod_1.z.string().min(1, "Etiqueta de departamento es requerida").optional(),
    name: zod_1.z.string().min(1, "Nombre de departamento es requerido").optional(),
    description: zod_1.z.string().min(1, "Descripción de departamento es requerida").optional(),
});
//# sourceMappingURL=department.validation.js.map