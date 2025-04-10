// src/validations/sharedValidators.ts
import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z.string().transform((val, ctx) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "ID no es un ObjectId válido",
    });
    return z.NEVER; // Detiene la ejecución
  }
  return new mongoose.Types.ObjectId(val); // Convierte a ObjectId
});

export type ObjectIdParam = z.output<typeof objectIdSchema>; // Tipo: mongoose.Types.ObjectId