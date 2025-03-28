import {z} from 'zod';
import mongoose from "mongoose";

export const supplierSchemaZod = z.object({

    id : z.string().min(1, "ID de proveedor es requerido"),
    name : z.string().min(1, "Nombre de proveedor es requerido"),
    tradeName : z.string().min(1, "Nombre comercial del proveedor es requerido"),
    contactPerson : z.string().min(1, "Persona de contacto del proveedor es requerido"),
    phoneNumber : z.string().min(1, "Teléfono del proveedor es requerido"),
    email : z.string().email("Formato de correo del proveedor no es valido"),
    address : z.string().min(1, "Dirección del proveedor es requerida"),
    city : z.string().min(1, "Ciudad del proveedor es requerido"),
    state : z.string().min(1, "Estado del proveedor es requerido"),
    zipCode : z.string().min(1, "Código zip del proveedor es requerido"),
    country : z.string().min(1, "País del proveedor es requerido"),
    taxId : z.string().min(1, "ID fiscal del proveedor es requerido"),
    businessRegistrationNumber : z.string().min(1, "Número de registro del comercio del proveedor es requerido"),
    paymentTerm : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId, 
        { message: "Debe ser un ObjectId válido de Mongoose" }
      ),
    isActive : z.boolean().optional(),
    notes : z.string().optional(),
});

export type SupplierDto = z.infer<typeof supplierSchemaZod>;