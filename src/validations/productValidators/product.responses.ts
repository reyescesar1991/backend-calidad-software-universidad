import { z } from "zod";
import mongoose from "mongoose";
import { cityMap } from "../../core/maps";

const validCities = Array.from(cityMap.values());


export const stockByWarehouseResponse = z.object({

    quantity : z.number(),
    productCustomId : z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName: z.string().min(1, "Nombre de producto es requerido"),
    warehouseId : z.string().refine(
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
    warehouseName : z.string().min(1, "Nombre de almacen es requerido"),
});

export const stockTotalByProductResponse = z.object({

    productId : z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    productCustomId : z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName : z.string().min(1, "Nombre de producto es requerido"),
    quantity : z.number()
});

export const amountTotalStockByProductByWarehouseResponse = z.object({

    productId : z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    productCustomId : z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName : z.string().min(1, "Nombre de producto es requerido"),
    totalAmount : z.number(),
    warehouseId : z.string().refine(
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
    warehouseName : z.string().min(1, "Nombre de almacen es requerido"),
});

export const amountTotalStockByProductResponse = z.object({

    productId : z.instanceof(mongoose.Schema.Types.ObjectId).refine(
            val => val instanceof mongoose.Schema.Types.ObjectId,
            { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    productCustomId : z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName : z.string().min(1, "Nombre de producto es requerido"),
    totalAmount : z.number(),
});


//Response para cantidad de ese producto en un almacen
export type StockByWarehouseResponse = z.infer<typeof stockByWarehouseResponse>;


//Response para cantidad de ese producto en todos los almacenes
export type StockTotalByProductResponse = z.infer<typeof stockTotalByProductResponse>;

//Response para el monto total de ese producto en un almacen
export type AmountTotalStockByProductByWarehouseResponse = z.infer<typeof amountTotalStockByProductByWarehouseResponse>;

//Response para el monto total de ese producto en todos los almacenes
export type AmountTotalStockByProductResponse = z.infer<typeof amountTotalStockByProductResponse>;