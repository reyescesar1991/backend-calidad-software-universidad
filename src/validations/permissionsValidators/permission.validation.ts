import {z} from 'zod';

export const createPermissionSchemaZod = z.object({

    label : z.string().min(1, {message : 'El label es requerido'}),
    permission: z.string().min(1, {message : 'El permiso es requerido'}),
    can : z.boolean().optional(),
});

export const updatePermissionSchemaZod = z.object({

    label : z.string().min(1, {message : 'El label es requerido'}).optional(),
    permission : z.string().min(1, {message : 'El permiso es requerido'}).optional(),
    can : z.boolean().optional(),
});

export type CreatePermissionDto = z.infer<typeof createPermissionSchemaZod>;
export type UpdatePermissionDto = z.infer<typeof updatePermissionSchemaZod>;