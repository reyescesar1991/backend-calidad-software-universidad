import {z} from 'zod';

export const paymentTermSchemaZod = z.object({

    id : z.string().min(1, "ID de término de pago es requerido"),
    name : z.string().min(1, "Nombre del término de pago es requerido"),
    description : z.string().min(1, "Descripción del término de pago es requerido"),
    daysToPay : z.number().gte(0, "Dia mínimo de pago es uno"),
    discount : z.number().optional(),
    isActive : z.boolean()
});

export type PaymentTermDto = z.infer<typeof paymentTermSchemaZod>;