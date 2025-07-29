import { z } from "zod";
import mongoose from "mongoose";

export const locationDataUserSchemaZod = z.object({

    departmentId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),

    headquarterId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),

    warehouseId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),
    
    userId : z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
});


export type LocationUserDataDto = z.infer<typeof locationDataUserSchemaZod>;