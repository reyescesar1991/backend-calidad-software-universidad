import { z } from "zod";
import { departmentAbbreviationsMap } from "../../core/maps";

const validAbbreviations = Array.from(departmentAbbreviationsMap.values());

export const DepartmentFilterSchema = z.object({

    idDepartment: z.string().min(1, "ID de departamento es requerido").refine(
        (value) => {

            // Verificar formato: [Abreviatura][DosDígitos]
            const regex = /^([A-Za-z]+)(\d{2})$/;
            const match = RegExp(regex).exec(value);
            if (!match) return false; // Formato incorrecto

            const abbreviation = match[1]; // Parte alfabética (ej: "CMP")
            console.log(match);
            return validAbbreviations.includes(abbreviation); // Validar abreviatura
        },
        (value) => ({
            message: 
              `Formato inválido. Debe ser: [Abreviatura][DosDígitos] (ej: ${validAbbreviations[0]}01). ` +
              `Abreviaturas válidas: ${validAbbreviations.join(", ")}`
        })
    ).optional(),
    label : z.string().min(1, "Etiqueta de departamento es requerida").optional(),
    name : z.string().min(1, "Nombre de departamento es requerido").optional(),
    headquartersName : z.string().min(1, "Nombre de sede del departamento es requerido").optional(),
    isActive : z.boolean().optional(),
});