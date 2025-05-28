import {z} from 'zod';
import mongoose from 'mongoose';


export const userPermissionSchemaZod = z.object({

    idUser : z.string().min(1, "ID de user es requerido"),
    roleId : z.string().min(1, "ID de role es requerido"),
    customPermissions: z.array( // 👈 Definición directa
        z.object({
            permissionId: z.instanceof(mongoose.Types.ObjectId).refine(
                val => val instanceof mongoose.Types.ObjectId,
                { message: "Debe ser un ObjectId válido de Mongoose" }
            ),
            can: z.boolean({
                required_error: "El campo 'can' es requerido",
                invalid_type_error: "'can' debe ser verdadero o falso"
            }),
            permissionLabel: z.string().min(1, "Label del permiso es requerido"),
        })
    )
    .refine(
        permissions => {
            const ids = permissions.map(p => p.permissionId);
            return new Set(ids).size === ids.length; // Validar duplicados
        }, 
        "No se permiten permisos repetidos"
    )
    .default([]),

});

export type UserPermissionDto = z.infer<typeof userPermissionSchemaZod>;