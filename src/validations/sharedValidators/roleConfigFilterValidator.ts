import { z } from "zod";

export const RoleConfigFilterSchema = z.object({

    rolName: z.string().min(1, "Nombre del rol es demasiado corto").optional(),
    maxLoginAttempts: z.number().optional(),
    isActive : z.boolean().optional(),

}).strict();