import { z } from "zod";
import mongoose from "mongoose";

const regex = /^\d+$/;

export const UserTwoFactorValueUserSchemaZod = z.object({

    userId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    method: z.string().min(1, "El método es requerido"),
    value: z.string().regex(regex, "El valor del factor de autenticación debe ser un valor númerico"),
    expiresAt: z.date(),

});

export type UserTwoFactorValueUserDto = z.infer<typeof UserTwoFactorValueUserSchemaZod>;