import {z} from 'zod';
import mongoose from "mongoose";

export const subrouteSchemaZod = z.object({

    id : z.string().min(2, "ID de subruta inválido"),
    name : z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
    path : z.string().min(1, "Path es requerido"),
    active : z.boolean(),
    permissionKey : z.string().min(1, "Permiso asociado es requerido"),
    mainRoute: z.string().min(1, "Ruta padre es requerida"),
    parentId: z.instanceof(mongoose.Types.ObjectId),

});

export const routeSchemaZod = z.object({

    id : z.string().min(2, "ID de ruta inválido"),
    name : z.string().min(2, "Nombre de ruta debe tener al menos 2 caracteres"),
    path : z.string().min(1, "Path es requerido"),
    icon : z.string().min(1, "Ícono es requerido"),
    active : z.boolean(),
    subroutes : z.array(subrouteSchemaZod)
});


export const moduleSchemaZod = z.object({

    id : z.string().min(2, {message : 'El id debe ser un nombre valido'}),

    title : z.string().min(1, {message : 'Titulo es requerido'}),

    routes : z.array(routeSchemaZod)
})

export type ModuleDto = z.infer<typeof moduleSchemaZod>;
export type RouteDto = z.infer<typeof routeSchemaZod>;
export type SubrouteDto = z.infer<typeof subrouteSchemaZod>;