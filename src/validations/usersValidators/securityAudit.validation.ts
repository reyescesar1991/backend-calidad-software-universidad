import {z} from 'zod';
import mongoose from 'mongoose';

export const securityAuditSchemaZod = z.object({

    userId : z.instanceof(mongoose.Types.ObjectId).refine(
            val => val instanceof mongoose.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
        ),
    loginAttempts : z.number().gte(0, "El mínimo de intentos de login es de cero").max(3, "El usuario puede tener hasta 3 fallos de intento de login"),
    secondFactorAttempts : z.number().gte(0, "El mínimo de intentos de segundo factor es de cero").max(3, "El usuario puede tener hasta 3 fallos de intento de segundo factor"),
    lastFailedLogin : z.date().optional(),
    blockedUntil : z.date().optional(),
});

export const updateSecurityAuditSchemaZod = z.object({

    lastFailedLogin : z.date().optional(),
    blockedUntil : z.date().optional(),
});


export type SecurityAuditDto = z.infer<typeof securityAuditSchemaZod>;
export type UpdateSecurityAuditDto = z.infer<typeof updateSecurityAuditSchemaZod>;