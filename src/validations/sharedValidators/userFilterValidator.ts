import { z } from "zod";
import mongoose from "mongoose";

export const UserFilterSchema = z.object({

    idUser: z.string().min(1, "ID del usuario es demasiado corto").optional(),
    name: z.string().min(2, "Nombre de usuario muy corto").optional(),
    lastName: z.string().min(2, "Apellido de usuario es muy corto").optional(),
    codeCountry : z.string().min(2, "Código de pais demasiado corto").optional(),
    phoneNumber : z.string().min(1, "Telefono del usuario es requerido").regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email : z.string().min(1, "Email del usuario es requerido").email("Formato de correo del usuario no es valido").optional(),
    username : z.string().min(2, "Nombre de usuario demasiado corto").optional(),
    status : z.string().min(2, "Estatus del usuario es requerido").optional(),
    hasTwoFactor : z.boolean().optional(),
    department : z.instanceof(mongoose.Types.ObjectId).refine(
            val => val instanceof mongoose.Types.ObjectId, 
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),
    roleConfig : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),

}).strict();