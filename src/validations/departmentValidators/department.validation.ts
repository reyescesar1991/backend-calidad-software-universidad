import { z } from 'zod';
import { departmentAbbreviationsMap } from '../../core/maps';
import mongoose from 'mongoose';


const validAbbreviations = Array.from(departmentAbbreviationsMap.values());

export const departmentSchemaZod = z.object({

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
    ),
    label : z.string().min(1, "Etiqueta de departamento es requerida"),
    name : z.string().min(1, "Nombre de departamento es requerido"),
    description : z.string().min(1, "Descripción de departamento es requerida").optional(),
    headquartersId : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    headquartersName : z.string().min(1, "Nombre de sede del departamento es requerido"),
    isActive : z.boolean().optional(),
});

export const updateDepartmentSchemaZod = z.object({

    label : z.string().min(1, "Etiqueta de departamento es requerida").optional(),
    name : z.string().min(1, "Nombre de departamento es requerido").optional(),
    description : z.string().min(1, "Descripción de departamento es requerida").optional(),
});

export type DepartmentDto = z.infer<typeof departmentSchemaZod>;
export type UpdateDepartmentDto = z.infer<typeof updateDepartmentSchemaZod>;