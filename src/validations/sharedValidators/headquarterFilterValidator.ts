import { z } from "zod";

export const HeadquarterFilterSchema = z.object({

    idHeadquarter : z.string().min(1 , "ID de sede es requerido").optional(),
    label : z.string().min(1, "Etiqueta de sede es requerida").optional(),
    name : z.string().min(1, "El nombre de sede es requerido").optional(),
    address : z.string().min(1, "La dirección de sede es requerida").optional(),
    geoLocation: z.object({
        city: z.string().min(1, "La ciudad de la sede es requerida").optional(),
        state: z.string().min(1, "Estado de sede es requerido").optional(),
        zipCode : z.string().min(1, "Código Zip es requerido").optional(),
    }).optional(),
    phoneNumber : z.string().min(1, "Telefono de sede es requerido").regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }).optional(),
    email : z.string().min(1, "Email de sede es requerido").email("Formato de correo de sede no es valido").optional(),
    isActive : z.boolean().optional(),

}).strict();