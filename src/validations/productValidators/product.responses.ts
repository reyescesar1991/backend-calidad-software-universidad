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

// Define este nuevo esquema Zod en un archivo dto, por ejemplo, warehouse-total-monetary-value-response.dto.ts
export const warehouseTotalMonetaryValueResponse = z.object({
    warehouseId: z.string().refine(
        (value) => {
            const regex = /^ALM-[a-zA-Z]+-\d{3}$/;
            return regex.test(value);
        },
        (value) => ({
            message: `Formato inválido. Debe ser: [ALM]-[AbreviaciónCiuda]-[XXX] (ej: ALM-${validCities[0]}-001). ` +
                `Abreviaturas válidas: ${validCities.join(", ")}`
        })
    ),
    warehouseName: z.string().min(1, "Nombre de almacen es requerido"),
    totalMonetaryValue: z.number(), // Este será el monto total de todos los productos
});

export type WarehouseTotalMonetaryValueResponse = z.infer<typeof warehouseTotalMonetaryValueResponse>;

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

export const amountTotalStockByProductByWarehouseResponse = z.object({
    productId: z.instanceof(mongoose.Types.ObjectId).refine( // Usamos mongoose.Types.ObjectId para la instancia
        (val) => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    productCustomId: z.string().refine(
        (value) => {
            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        },
        "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName: z.string().min(1, "Nombre de producto es requerido"),
    totalAmount: z.number().min(0, "El monto total no puede ser negativo"), // Añadido min(0) por lógica de negocio
    warehouseId: z.string().refine(
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
    warehouseName: z.string().min(1, "Nombre de almacen es requerido"),
});


// Define este nuevo esquema Zod en un archivo dto, por ejemplo, warehouse-total-monetary-value-response.dto.ts
export const stockByStatusResponse = z.object({
    productCustomId: z.string().refine(
        (value) => {
            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        },
        "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    productName: z.string().min(1, "Nombre de producto es requerido"),
    quantity : z.number(),
    status : z.string(),
});


//Response para cantidad de ese producto en un almacen
export type StockByWarehouseResponse = z.infer<typeof stockByWarehouseResponse>;

//Response para cantidad de ese producto en todos los almacenes
export type StockTotalByProductResponse = z.infer<typeof stockTotalByProductResponse>;

//Response para el monto total de valor de un almacen
export type AmountTotalByWarehouseResponse = z.infer<typeof warehouseTotalMonetaryValueResponse>;

//Response para el monto total de ese producto en todos los almacenes
export type AmountTotalStockByProductResponse = z.infer<typeof amountTotalStockByProductResponse>;

//Monto total de un producto en un almacen
export type AmountTotalStockByProductByWarehouseResponse = z.infer<typeof amountTotalStockByProductByWarehouseResponse>;

//Response para cantidad de ese producto en un almacen
export type StockByStatusResponse = z.infer<typeof stockByStatusResponse>;