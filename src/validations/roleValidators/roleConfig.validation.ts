import {z} from 'zod';
import mongoose from 'mongoose';

export const roleConfigSchemaZod = z.object({

    rolID : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
      ),
    maxLoginAttempts : z.number().gte(0, "El mínimo de intentos es 1"),
    isActive : z.boolean().optional(),

});

export type RoleConfigDto = z.infer<typeof roleConfigSchemaZod>;