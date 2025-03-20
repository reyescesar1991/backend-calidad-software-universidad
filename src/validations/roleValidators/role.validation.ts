import {z} from 'zod';
import mongoose from "mongoose";


export const roleSchema = z.object({

    idRole : z.string().min(1, {message : 'ID de rol es requerido'}),
    name : z.string().min(1, {message: 'Nombre del rol es requerido'}),
    label : z.string().min(1, {message: 'La etiqueta de rol es requerida'}),
    permissions: z.array(
        z.instanceof(mongoose.Types.ObjectId).refine(val => val instanceof mongoose.Types.ObjectId, {
          message: "Debe ser un ObjectId de Mongoose",
        })
      ),
    description : z.string().min(1, {message: 'La descripción es requerida'}),
    isActive : z.boolean(),
    isDefault : z.boolean(),
});


export type RoleDto = z.infer<typeof roleSchema>;