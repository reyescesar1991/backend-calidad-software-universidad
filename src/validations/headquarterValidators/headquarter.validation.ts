import {z} from 'zod';

export const headquarterSchemaZod = z.object({

    idHeadquarter : z.string().min(1 , "ID de sede es requerido"),
    label : z.string().min(1, "Etiqueta de sede es requerida"),
    name : z.string().min(1, "El nombre de sede es requerido"),
    address : z.string().min(1, "La dirección de sede es requerida"),
    city : z.string().min(1, "La ciudad de la sede es requerida"),
    state : z.string().min(1, "Estado de sede es requerido"),
    zipCode : z.string().min(1, "Código Zip es requerido"),
    country : z.string().min(1, "País de sede es requerido"),
    phoneNumber : z.string().min(1, "Telefono de sede es requerido").regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email : z.string().min(1, "Email de sede es requerido").email("Formato de correo de sede no es valido"),
    isActive : z.boolean(),
});

export type HeadquarterDto = z.infer<typeof headquarterSchemaZod>;