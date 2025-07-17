"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentFilterSchema = void 0;
const zod_1 = require("zod");
const maps_1 = require("../../core/maps");
const validAbbreviations = Array.from(maps_1.departmentAbbreviationsMap.values());
exports.DepartmentFilterSchema = zod_1.z.object({
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
    })).optional(),
    label: zod_1.z.string().min(1, "Etiqueta de departamento es requerida").optional(),
    name: zod_1.z.string().min(1, "Nombre de departamento es requerido").optional(),
    headquartersName: zod_1.z.string().min(1, "Nombre de sede del departamento es requerido").optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=departmentFilterValidator.js.map