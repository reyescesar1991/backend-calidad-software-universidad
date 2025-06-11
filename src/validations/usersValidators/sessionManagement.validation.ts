import { z } from 'zod';

export const sessionManagementSchemaZod = z.object({

    userId: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    token: z.string(),
    ipAddress: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, {
        message: "La dirección IP no es válida",
    }),
    userAgent: z.string().min(1, "El dispositivo del usuario es requerido"),
    expiresAt: z.number()
});

export const UpdateSessionManagementSchemaZod = z.object({

    token: z.string(),
    expiresAt: z.number(),
});

export type SessionManagementDto = z.infer<typeof sessionManagementSchemaZod>;
export type UpdateSessionManagementDto = z.infer<typeof UpdateSessionManagementSchemaZod>;