import { z } from 'zod';
import { pathRegex } from '../../core/regex';


export const SubrouteFilterSchema = z.object({

    path: z.string().regex(pathRegex, "Formato de ruta inválido").optional(),
    active: z.boolean().optional(),
    name: z.string().min(2, "Nombre muy corto").optional(),
    mainRoute: z.string().min(1, "Ruta principal requerida").optional()

}).strict()

export const RouteFilterSchemaZod = z.object({

    path: z.string().regex(pathRegex, "Formato de ruta inválido").optional(),
    active: z.boolean().optional(),
    name: z.string().min(2, "Nombre muy corto").optional(),
    icon: z.string().min(1, "Ruta principal requerida").optional()

}).strict()