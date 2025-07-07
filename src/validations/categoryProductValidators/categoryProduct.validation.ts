import {z} from 'zod';

export const categoryProductZodSchema = z.object({

    idCategory : z.string().min(1, "ID de categoria de producto es requerido"),
    label : z.string().min(1, "Etiqueta de categoria es requerida"),
    name : z.string().optional(),
    slug : z.string().optional(),
    description : z.string().optional(),
    isVisible : z.boolean().optional(),
    isActive : z.boolean().optional(),
});

export const updateCategoryProductZodSchema = z.object({

    label : z.string().min(1, "Etiqueta de categoria es requerida").optional(),
    name : z.string().optional(),
    slug : z.string().optional(),
    description : z.string().optional(),
});

export type CategoryProductDto = z.infer<typeof categoryProductZodSchema>;
export type UpdateCategoryProductDto = z.infer<typeof updateCategoryProductZodSchema>;