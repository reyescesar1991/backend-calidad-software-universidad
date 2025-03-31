import { z } from 'zod';

export const sessionManagementSchemaZod = z.object({

    userId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    token: z.string(),
    createdAt: z.date().refine(
        (date) => {
            const now = new Date();
            return date <= now;
        },
        {
            message: "La fecha de creación no puede ser posterior a la fecha actual.",
        }
    ),
    expiresAt: z.date().refine(
        (date) => {
            const now = new Date();
            return date >= now;
        },
        {
            message: "La fecha de expiración no puede ser anterior a la fecha actual.",
        }
    ),
    ipAddress: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
        message: "La dirección IP no es válida",
    }),
    userAgent: z.string().min(1, "El dispositivo del usuario es requerido"),
    isActive: z.boolean(),
});

export type SessionManagementDto = z.infer<typeof sessionManagementSchemaZod>;