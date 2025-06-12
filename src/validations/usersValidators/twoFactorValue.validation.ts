import { z } from "zod";
import mongoose from "mongoose";

const regex = /^\d+$/;

export const UserTwoFactorValueUserSchemaZod = z.object({

    userId : z.string().min(1, "El ID de usuario es requerido"),
    method : z.string().min(1, "El método es requerido"),
    value : z.string().regex(regex, "El valor del factor de autenticación debe ser un valor númerico"),
    expiresAt : z.date(),

});

export type UserTwoFactorValueUserDto = z.infer<typeof UserTwoFactorValueUserSchemaZod>;