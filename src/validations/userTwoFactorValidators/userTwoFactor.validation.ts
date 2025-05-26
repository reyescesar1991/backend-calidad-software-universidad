

import { z } from "zod";

export const UserTwoFactorActiveSchemaZod = z.object({

    userId : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    twoFactorId : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    isActive : z.boolean().optional(),

});

export type UserTwoFactorActiveDto = z.infer<typeof UserTwoFactorActiveSchemaZod>;