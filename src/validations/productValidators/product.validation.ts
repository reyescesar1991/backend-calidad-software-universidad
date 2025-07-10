import { z } from 'zod';
import { CategoryProductEnum } from '../../core/enums';
import mongoose from 'mongoose';

export const productSchemaZod = z.object({

    idProduct: z.string().refine(

        (value) => {

            const regex = /^PROD\d{6}$/;
            return regex.test(value);
        }, "Formato de ID de producto incorrecto, debe tener el siguiente formato: PROD000000"
    ),
    name: z.string().min(1, "Nombre de producto es requerido"),
    description: z.string().optional(),
    sku: z.string().refine(

        (value) => {

            const regex = /^(FRU|VER|LAC|CAR|PAN|BEB|CON|ENL|LIM|OTR)-[a-zA-Z0-9]+-\d{8}$/;
            return regex.test(value);

        }, `El SKU debe tener el formato: [Categoría]-[Marca]-[8 dígitos] (ej: FRU-MARCA001-12345678). Las categorías válidas son: ${Object.keys(CategoryProductEnum).join(", ")}`,
    ),
    barcode: z.string().refine(
        (value) => {

            const regex = /^\d{8}$/;
            return regex.test(value);
        }, "El código de barra debe tener 8 digitos númericos"
    ),
    categoryId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    supplierId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ),
    brand: z.string().min(1, "Marca de producto es requerido"),
    purchasePrice: z.number().gte(0.01, "Precio mínimo de compra es 0.11$"),
    sellingPrice: z.number().gte(0.1, "Precio mínimo de venta es de 0.1$"),
    currency: z.string().min(1, "Tipo de moneda del producto es requerido"),
    minimumStockLevel: z.number().gte(1, "El mínimo de stock para alarma para un producto es 1"),
    maximumStockLevel: z.number(),
    unitOfMeasure: z.string().min(1, "Unidad de medida es requerida"),
    imageUrl: z.string().optional(),
    updatedAt: z.date().refine(
        (date) => {
            const now = new Date();
            return date <= now;
        },
        {
            message: "La fecha de actualización no puede ser posterior a la fecha actual.",
        }
    ).optional(),
    isActive: z.boolean().optional(),
    notes: z.string().optional(),
    warehouseStock: z.array(
        z.object({
            warehouseId: z.instanceof(mongoose.Types.ObjectId).refine(
                (val) => val instanceof mongoose.Types.ObjectId,
                { message: "ID de almacén inválido" }
            ),
            quantity: z.number().min(0, "La cantidad no puede ser negativa")
        })
    ).refine(
        (arr) => new Set(arr.map((item) => item.warehouseId.toString())).size === arr.length,
        { message: "No puede haber almacenes duplicados" }
    )

});

export const updateProductSchemaZod = z.object({

    name: z.string().min(1, "Nombre de producto es requerido").optional(),
    description: z.string().optional(),
    categoryId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),
    supplierId: z.instanceof(mongoose.Types.ObjectId).refine(
        val => val instanceof mongoose.Types.ObjectId,
        { message: "Debe ser un ObjectId válido de Mongoose" }
    ).optional(),
    brand: z.string().min(1, "Marca de producto es requerido").optional(),
    purchasePrice: z.number().gte(0.01, "Precio mínimo de compra es 0.11$").optional(),
    sellingPrice: z.number().gte(0.1, "Precio mínimo de venta es de 0.1$").optional(),
    currency: z.string().min(1, "Tipo de moneda del producto es requerido").optional(),
    minimumStockLevel: z.number().gte(1, "El mínimo de stock para alarma para un producto es 1").optional(),
    maximumStockLevel: z.number().optional(),
    unitOfMeasure: z.string().min(1, "Unidad de medida es requerida").optional(),
    imageUrl: z.string().optional().optional(),
    notes: z.string().optional().optional(),

});

export type ProductDto = z.infer<typeof productSchemaZod>;
export type UpdateProductDto = z.infer<typeof updateProductSchemaZod>;