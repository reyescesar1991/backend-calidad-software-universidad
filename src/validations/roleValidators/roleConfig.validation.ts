import {z} from 'zod';
import mongoose from 'mongoose';

export const roleConfigSchemaZod = z.object({

    rolID : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
      ),
    maxLoginAttempts : z.number().gte(2, "El mínimo de intentos es 2"),
    isActive : z.boolean().optional(),
    rolName : z.string().min(1, "Nombre de rol es requerido"),

});

export const updateRoleConfigSchemaZod = z.object({

  maxLoginAttempts : z.number().gte(2, "El mínimo de intentos es 2").optional(),
  rolName : z.string().min(1, "Nombre de rol es requerido").optional(),

});

export type RoleConfigDto = z.infer<typeof roleConfigSchemaZod>;
export type UpdateRoleConfigDto = z.infer<typeof updateRoleConfigSchemaZod>;