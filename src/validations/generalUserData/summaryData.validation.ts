import { z } from "zod";

export const summaryDataResponseSchemaZod = z.object({

    iconType : z.string(),
    icon : z.string(),
    titleCard : z.string(),
    valueCard : z.number(),
    unit : z.string(),
});

export type SummaryDataResponseDto = z.infer<typeof summaryDataResponseSchemaZod>;