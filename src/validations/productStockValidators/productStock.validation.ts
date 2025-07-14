import { z } from "zod";
import mongoose from "mongoose";
import { cityMap } from "../../core/maps";

const validCities = Array.from(cityMap.values());

export const productStockSchemaZod = z.object({

    productId : z.instanceof(mongoose.Types.ObjectId).refine(
            val => val instanceof mongoose.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),

    productCustomId : z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),

    warehouseId : z.instanceof(mongoose.Types.ObjectId).refine(
                    (val) => val instanceof mongoose.Types.ObjectId,
                    { message: "ID de almacén inválido" }
    ),

    warehouseCustomId : z.string().refine(
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

    quantity : z.number().gte(0, "la cantidad mínima de registro es de cero"),
    statusInWarehouse : z.boolean().optional(),

});

export const updateProductStockSchemaZod = z.object({

    quantity : z.number().gte(0, "la cantidad mínima de registro es de cero"),

});

export type ProductStockDto = z.infer<typeof productStockSchemaZod>;
export type UpdateProductStockDto = z.infer<typeof updateProductStockSchemaZod>;

