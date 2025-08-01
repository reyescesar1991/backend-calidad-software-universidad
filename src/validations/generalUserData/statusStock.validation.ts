import { z } from "zod";

export const statusStockSchemaZod = z.object({

    title: z.string(),
    porcentage: z.number(),
    typeStatus: z.string(),

});

export type StatusStockResponseDto = z.infer<typeof statusStockSchemaZod>;