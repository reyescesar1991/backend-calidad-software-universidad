import { z } from 'zod';
import mongoose from 'mongoose';

export const userPermissionSecuritySchemaZod = z.object({

    idUser: z.string().min(1, "ID de user es requerido"),
    idRol: z.string().min(1, "ID de rol es requerido"),
    customPermissionsSecurity: z.array( // 👈 Definición directa
        z.object({
            permissionSecurityId: z.instanceof(mongoose.Types.ObjectId).refine(
                val => val instanceof mongoose.Types.ObjectId,
                { message: "Debe ser un ObjectId válido de Mongoose" }
            ),
            can: z.boolean({
                required_error: "El campo 'can' es requerido",
                invalid_type_error: "'can' debe ser verdadero o falso"
            }),
            permissionKey: z.string().min(1, "Label del permiso es requerido"),
        })
    )
        .refine(
            permissions => {
                const ids = permissions.map(p => p.permissionSecurityId);
                return new Set(ids).size === ids.length; // Validar duplicados
            },
            "No se permiten permisos repetidos"
        )

});

export type UserPermissionSecurityDto = z.infer<typeof userPermissionSecuritySchemaZod>;