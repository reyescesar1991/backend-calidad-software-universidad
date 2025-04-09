import {z} from 'zod';
import { cityMap } from '../../core/maps';
import mongoose from 'mongoose';

const validCities = Array.from(cityMap.values());

export const warehouseSchemaZod = z.object({

    idWarehouse : z.string().refine(
        (value) => {

            const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
            return regex.test(value);
        },
        (value) => ({

            message: 
              `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
              `Abreviaturas válidas: ${validCities.join(", ")}`
        })
    ),
    idHeadquarter : z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    name : z.string().min(1, "Nombre de almacen es requerido"),
    address : z.string().min(1, "Dirección de almacen es requerido"),
    city : z.string().min(1, "Ciudad del almacen es requerido"),
    state : z.string().min(1, "Estado del pais del almacen es requerido"),
    country : z.string().min(1, "País del almacen es requerido"),
    capacity : z.number().gte(10, "El mínimo de capacidad de un almacen son diez toneladas"),
    currentCapacity : z.number().gte(0, "El mínimo de capacidad actual de un almacen es cero toneladas"),
    isActive : z.boolean().optional(),
    contactPerson : z.string().min(1, "Persona de contacto del almacen es requerida"),
    phoneNumber : z.string().regex(/^(0212)\d{7}$/, { message: 'Formato de telefono erroneo' }),
    email : z.string().email(),
    notes : z.string().optional(),
}).refine(
    (data) => data.currentCapacity <= data.capacity,
    {
      message: "La capacidad actual no puede ser mayor que la capacidad total",
      path: ["currentCapacity"] // 👈 Indica qué campo muestra el error
    }
);

export type WarehouseDto = z.infer<typeof warehouseSchemaZod>