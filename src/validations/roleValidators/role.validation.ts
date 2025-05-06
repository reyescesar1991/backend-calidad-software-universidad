import { z } from 'zod';
import mongoose from "mongoose";


export const roleSchema = z.object({

  idRole: z.string().min(1, { message: 'ID de rol es requerido' }),
  name: z.string().min(1, { message: 'Nombre del rol es requerido' }),
  label: z.string().min(1, { message: 'La etiqueta de rol es requerida' }),
  permissions: z.array(
    z.instanceof(mongoose.Types.ObjectId).refine(val => val instanceof mongoose.Types.ObjectId, {
      message: "Debe ser un ObjectId de Mongoose",
    })
  ).optional(),
  permissionsSecurity: z.array(
    z.instanceof(mongoose.Types.ObjectId).refine(val => val instanceof mongoose.Types.ObjectId, {
      message: "Debe ser un ObjectId de Mongoose",
    })
  ).optional(),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  managePermissions: z.boolean(),
});

export const updateRoleSchema = z.object({
  idRole: z
    .string()
    .min(1, { message: "ID de rol es requerido si se envía" })
    .optional(),
  name: z
    .string()
    .min(1, { message: "Nombre del rol es requerido si se envía" })
    .optional(),
  label: z
    .string()
    .min(1, { message: "La etiqueta de rol es requerida si se envía" })
    .optional(),
  description: z
    .string()
    .min(1, { message: "La descripción es requerida si se envía" })
    .optional(),
  isActive: z.boolean().optional(),
  isDefault: z.boolean().optional(),
}).partial(); // ¡Cláusula clave para hacer todo opcional!

export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
export type RoleDto = z.infer<typeof roleSchema>;