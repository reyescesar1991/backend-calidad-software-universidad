import { z } from 'zod';

export const sessionManagementSchemaZod = z.object({

    userId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    token: z.string(),
    ipAddress: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
        message: "La dirección IP no es válida",
    }),
    userAgent: z.string().min(1, "El dispositivo del usuario es requerido"),
});

export const UpdateSessionManagementSchemaZod = z.object({

    token: z.string(),
});

export type SessionManagementDto = z.infer<typeof sessionManagementSchemaZod>;
export type UpdateSessionManagementDto = z.infer<typeof UpdateSessionManagementSchemaZod>;