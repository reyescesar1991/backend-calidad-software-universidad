import { z } from "zod";

export const RoleFilterSchema = z.object({

    idRole: z.string().min(1, "ID del rol es demasiado corto").optional(),
    isActive: z.boolean().optional(),
    name: z.string().min(2, "Nombre de rol muy corto").optional(),
    label: z.string().min(2, "Etiqueta de rol es muy corta").optional(),
    description : z.string().min(1, "Descripción del rol es muy corta").optional(),
    isDefault : z.boolean().optional(),

}).strict();