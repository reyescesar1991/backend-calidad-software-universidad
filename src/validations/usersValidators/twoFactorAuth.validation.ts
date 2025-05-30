import {z} from 'zod';

export const twoFactorAuthSchemaZod = z.object({

    method : z.string().min(1, "Método de autenticación es requerido"),
    isEnabled : z.boolean(),
    quantityUsers : z.number().gte(0, "El valor mínimo de usuario es cero"),
});

export const updateTwoFactorAuthSchemaZod = z.object({

    method : z.string().min(1, "Método de autenticación es requerido").optional(),
    isEnabled : z.boolean().optional(),
    quantityUsers : z.number().gte(0, "El valor mínimo de usuario es cero").optional(),
});

export type TwoFactorAuthDto = z.infer<typeof twoFactorAuthSchemaZod>;
export type UpdateTwoFactorAuthDto = z.infer<typeof updateTwoFactorAuthSchemaZod>;