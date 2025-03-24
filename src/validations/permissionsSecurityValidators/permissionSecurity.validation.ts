import {z} from 'zod';

export const permissionSecurityZodSchema = z.object({

    can : z.boolean(),
    label : z.string().min(1, "Etiqueta del permiso de seguridad es requerido"),
    permission : z.string().min(1, "Permiso es requerido"),
    id : z.string().min(1, "ID de permiso de seguridad es requerido"),
    description : z.string().optional(),
    category : z.string().optional(),
    isSystemDefined : z.boolean().optional(),
});

export type PermissionSecurityDto = z.infer<typeof permissionSecurityZodSchema>;