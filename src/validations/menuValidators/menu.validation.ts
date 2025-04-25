import { z } from 'zod';
import mongoose from "mongoose";

const pathRegex = /^\/[a-z0-9_-]+(\/[a-z0-9_-]+)*\/?$/i;

export const subrouteSchemaZod = z.object({

  id: z.string().min(2, "ID de subruta inválido"),
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  path: z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta inválido. Ejemplo válido: /dashboard/productos"),
  active: z.boolean(),
  permissionKey: z.string().min(1, "Permiso asociado es requerido"),
  mainRoute: z.string().min(1, "Ruta padre es requerida"),
  // parentId: z.instanceof(mongoose.Types.ObjectId),

});

export const subrouteUpdateSchemaZod = z.object({

  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres").optional(),
  path: z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta inválido. Ejemplo válido: /dashboard/productos").optional(),
  active: z.boolean().optional(),
  mainRoute: z.string().min(1, "Ruta padre es requerida").optional(),

});

export const routeSchemaZod = z.object({

  id: z.string().min(2, "ID de ruta inválido"),
  idModule : z.string().min(1, "ID de módulo padre es requerido"),
  name: z.string().min(2, "Nombre de ruta debe tener al menos 2 caracteres"),
  path: z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta no valido. Ejemplo: /dashboard/productos"),
  icon: z.string().min(1, "Ícono es requerido"),
  active: z.boolean(),
  subroutes: z.array(
    // Validar que cada elemento sea una instancia de ObjectId
    z.instanceof(mongoose.Types.ObjectId, {
      message: "Debe ser un ObjectId válido",
    })
  )
});

export const routeUpdateSchemaZod = z.object({

  idModule : z.string().min(1, "ID de módulo padre es requerido").optional(),
  name: z.string().min(2, "Nombre de ruta debe tener al menos 2 caracteres").optional(),
  path: z.string().min(1, "Path es requerido").regex(pathRegex, "Formato de ruta no valido. Ejemplo: /dashboard/productos").optional(),
  icon: z.string().min(1, "Ícono es requerido").optional(),
  active: z.boolean().optional(),
});

export const moduleSchemaZod = z.object({

  id: z.string().min(2, { message: 'El id debe ser un nombre valido' }),

  title: z.string().min(1, { message: 'Titulo es requerido' }),

  routes: z.array(
    // Validar que cada elemento sea una instancia de ObjectId
    z.instanceof(mongoose.Types.ObjectId, {
      message: "Debe ser un ObjectId válido",
    })
  )
})

export type ModuleDto = z.infer<typeof moduleSchemaZod>;
export type RouteDto = z.infer<typeof routeSchemaZod>;
export type RouteUpdateDto = z.infer<typeof routeUpdateSchemaZod>;
export type SubrouteDto = z.infer<typeof subrouteSchemaZod>;
export type SubrouteUpdateDto = z.infer<typeof subrouteUpdateSchemaZod>