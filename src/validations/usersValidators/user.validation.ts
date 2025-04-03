import { z } from 'zod';
import mongoose from 'mongoose';

export const userSchemaZod = z.object({

    idUser: z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),
    rol: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    name: z.string().min(1, "Nombre del usuario es requerido"),
    lastName: z.string().min(1, "Apellido del usuario es requerido"),
    codeCountry: z.string().min(1, "El código de país es requerido"),
    phoneNumber: z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
    username: z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    status: z.string().min(1, "El estatus del usuario es requerido"),
    hasTwoFactor: z.boolean(),
    lastLogin: z.string().optional(),
    department: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    roleConfig: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    passwordHistory: z
        .array(z.string())
        .max(5, {
            message: "El historial no puede exceder 5 contraseñas"
        })
        .optional()
        .default([]),
});

export type UserDto = z.infer<typeof userSchemaZod>;