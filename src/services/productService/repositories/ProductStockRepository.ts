import { inject, injectable } from "tsyringe";
import { ClientSession, Model } from "mongoose";
import { ProductStockDocument, ProductDocument } from "../../../db/models";
import { ObjectIdParam, ProductStockDto, UpdateProductStockDto, StockByWarehouseResponse, StockTotalByProductResponse, AmountTotalStockByProductByWarehouseResponse, AmountTotalStockByProductResponse, StockByStatusResponse } from "../../../validations";
import { IProductStockRepository } from "../interfaces/IProductStockRepository";
import mongoose from "mongoose";
import { logger } from "../../../core/logger";
import { WarehouseTotalMonetaryValueResponse } from "../../../validations/productValidators/product.responses";

@injectable()
export class ProductStockRepositoryImpl implements IProductStockRepository {

    constructor(
        @inject("ProductStockModel") private readonly ProductStockModel: Model<ProductStockDocument>,
    ) { }

    async findProductStockByProductIdAndWarehouseId(customIdProduct: string, customIdWarehouse: string): Promise<ProductStockDocument | null> {

        return await this.ProductStockModel.findOne({ productCustomId: customIdProduct, warehouseCustomId: customIdWarehouse }).exec();
    }

    async findProductStockByProductId(idProduct: ObjectIdParam): Promise<ProductStockDocument[] | null> {

        return await this.ProductStockModel.find({ productId: idProduct }).exec();
    }

    async findProductByProductCustomId(customIdProduct: string): Promise<ProductStockDocument[] | null> {

        return await this.ProductStockModel.find({ productCustomId: customIdProduct }).exec();
    }

    async findProductByWarehouseId(idWarehouse: ObjectIdParam): Promise<ProductStockDocument[] | null> {

        return await this.ProductStockModel.find({ warehouseId: idWarehouse }).exec();
    }

    async findProductByWarehouseIdActive(idWarehouse : ObjectIdParam) : Promise<ProductStockDocument[] | null>{

        return await this.ProductStockModel.find({ warehouseId : idWarehouse, statusInWarehouse : true }).exec();
    }

    async findProductByWarehouseCustomId(customIdWarehouse: string): Promise<ProductStockDocument[] | null> {

        return await this.ProductStockModel.find({ warehouseCustomId: customIdWarehouse }).exec();
    }

    async findAllProductsStock(): Promise<ProductStockDocument[] | null> {

        return await this.ProductStockModel.find({}).exec();
    }

    async createProductStock(dataCreateProductStock: ProductStockDto, session?: ClientSession): Promise<ProductStockDocument | null> {

        const [productStock] = await this.ProductStockModel.create([dataCreateProductStock], { session });

        return productStock;
    }

    async updateProductStock(idProduct: string, idWarehouse: string, dataUpdateProductStock: UpdateProductStockDto, session?: ClientSession): Promise<ProductStockDocument | null> {

        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: idProduct, warehouseCustomId: idWarehouse }, dataUpdateProductStock, { new: true, runValidators: true, session }).exec();
    }

    async activateProductInWarehouse(customIdProduct: string, idWarehouse: string, session?: ClientSession): Promise<ProductStockDocument | null> {

        return await this.ProductStockModel.findOneAndUpdate(
            { productCustomId: customIdProduct, warehouseCustomId: idWarehouse },
            { $set: { statusInWarehouse: true } },
            { new: true, runValidators: true, session },
        ).exec();
    }

    async inactivateProductInWarehouse(customIdProduct: string, idWarehouse: string, session?: ClientSession): Promise<ProductStockDocument | null> {
        return await this.ProductStockModel.findOneAndUpdate(
            { productCustomId: customIdProduct, warehouseCustomId: idWarehouse },
            { $set: { statusInWarehouse: false } },
            { new: true, runValidators: true, session },
        ).exec();
    }

    async addStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null> {

        return await this.ProductStockModel.findOneAndUpdate(
            { productCustomId: idProduct, warehouseCustomId: idWarehouse },
            { $inc: { quantity: quantity } },
            { new: true, runValidators: true, session },
        ).exec();
    }

    async removeStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null> {

        return await this.ProductStockModel.findOneAndUpdate(
            { productCustomId: idProduct, warehouseCustomId: idWarehouse },
            { $inc: { quantity: -quantity } },
            { new: true, runValidators: true, session },
        ).exec();
    }

    async getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse[] | null> {

        try {
            const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);

            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el warehouseId
                { $match: { warehouseId: warehouseObjectId } },

                // 2. Lookup para unir con la colección de Productos (para productCustomId y productName)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData"
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que hay un solo producto por productId)
                { $unwind: "$productData" },

                // 4. Lookup para unir con la colección de Almacenes (para warehouseName)
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes en MongoDB
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo que hay un solo almacén por warehouseId)
                { $unwind: "$warehouseData" },

                // 6. Proyectar y renombrar los campos para que coincidan con StockByWarehouseResponse
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de ProductStock
                        quantity: "$quantity", // Directamente del ProductStock
                        productCustomId: "$productCustomId", // Directamente del ProductStock
                        productName: "$productData.name", // Del lookup a Product
                        warehouseId: "$warehouseCustomId", // Tu Zod espera el ID custom del almacén, no el ObjectId
                        warehouseName: "$warehouseData.name" // Del lookup a Warehouse
                    }
                }
            ];

            const results = await this.ProductStockModel.aggregate(pipeline).exec();

            if (results.length === 0) {
                return null;
            }

            return results as StockByWarehouseResponse[];

        } catch (error) {
            console.error(`Error getting stock for warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }

    async getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null> {

        try {
            const productObjectId = new mongoose.Types.ObjectId(idProduct);

            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el productId
                { $match: { productId: productObjectId } },

                // 2. Agrupar por productId para sumar la cantidad total de stock de ese producto
                {
                    $group: {
                        _id: "$productId", // Agrupamos por el ID del producto
                        totalQuantity: { $sum: "$quantity" }, // Sumamos todas las cantidades de stock
                        // Mantenemos los campos productCustomId y productId para la proyección final
                        productCustomId: { $first: "$productCustomId" }, // Tomamos el primer productCustomId encontrado (todos serán el mismo para este producto)
                    }
                },

                // 3. Lookup para unir con la colección de Productos (para obtener el productName)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "_id", // Ahora el _id del grupo es el productId
                        foreignField: "_id", // El _id de la colección de productos
                        as: "productData" // El array donde se guardará el documento del producto
                    }
                },
                // 4. Desestructurar el array productData (asumiendo que siempre habrá un solo producto por ID)
                { $unwind: "$productData" },

                // 5. Proyectar y renombrar los campos para que coincidan con StockTotalByProductResponse
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de grupo
                        productId: "$_id", // El _id del grupo es ahora el productId
                        productCustomId: "$productCustomId", // Del campo que mantuvimos en el $group
                        productName: "$productData.name", // Del lookup a Product
                        quantity: "$totalQuantity" // La cantidad total sumada del $group
                    }
                }
            ];

            const result = await this.ProductStockModel.aggregate(pipeline).exec();

            // Si no se encuentra el producto o no tiene stock, el resultado será un array vacío
            // Devolvemos el primer elemento o null
            return result[0] || null;

        } catch (error) {
            console.error(`Error getting total stock for product ${idProduct}:`, error);
            throw error;
        }
    }

    async getTotalStockMonetaryValueByWarehouse(idWarehouse: ObjectIdParam): Promise<WarehouseTotalMonetaryValueResponse | null> {

        try {
            const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);

            const pipeline = [
                // 1. Filtrar los documentos de ProductStock por el warehouseId
                { $match: { warehouseId: warehouseObjectId } },

                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'sellingPrice' para el cálculo del valor monetario
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData"
                    }
                },
                // 3. Desestructurar el array productData (asumiendo un solo match de producto)
                { $unwind: "$productData" },

                // 4. Lookup para unir con la colección de Almacenes
                // Necesitamos el 'name' para warehouseName
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo un solo match de almacén)
                { $unwind: "$warehouseData" },

                // 6. Agrupar TODOS los documentos restantes en un único grupo para sumar el valor total
                {
                    $group: {
                        _id: "$warehouseId", // Agrupamos por el ID del almacén para tener un solo resultado por almacén
                        totalMonetaryValue: { // Sumamos el valor monetario de CADA entrada de stock
                            $sum: { $multiply: ["$quantity", "$productData.sellingPrice"] }
                        },
                        // Preservamos el nombre y el ID custom del almacén para la proyección final
                        warehouseName: { $first: "$warehouseData.name" },
                        warehouseCustomId: { $first: "$warehouseCustomId" } // Asumo que el custom ID viene de ProductStock
                    }
                },

                // 7. Proyectar los campos finales para que coincidan con el nuevo DTO
                {
                    $project: {
                        _id: 0, // Ocultar el _id del grupo
                        warehouseId: "$warehouseCustomId", // Usamos el custom ID del almacén para el DTO
                        warehouseName: "$warehouseName",
                        totalMonetaryValue: "$totalMonetaryValue"
                    }
                }
            ];

            const result = await this.ProductStockModel.aggregate(pipeline).exec();

            // Si el almacén no tiene stock o el ID no existe, result será un array vacío
            return result[0] || null;

        } catch (error) {
            console.error(
                `Error getting total monetary value for warehouse ${idWarehouse}:`,
                error
            );
            throw error;
        }
    }

    async getAmountTotalStockByProduct(idProduct: ObjectIdParam): Promise<AmountTotalStockByProductResponse | null>{

        try {
            const productObjectId = new mongoose.Types.ObjectId(idProduct);

            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el productId dado
                { $match: { productId: productObjectId } },

                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'name' (para productName) y 'sellingPrice' (para el cálculo del monto total)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData" // Este campo contendrá el documento del producto (como un array)
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que cada stock se relaciona con un único producto)
                { $unwind: "$productData" },

                // 4. Agrupar por el productId para sumar todas las cantidades y mantener los datos del producto
                {
                    $group: {
                        _id: "$productId", // Agrupamos por el ID del producto para consolidar todas sus entradas de stock
                        totalQuantity: { $sum: "$quantity" }, // Sumamos las cantidades de stock de todos los almacenes para este producto
                        // Preservamos los datos del producto necesarios para la proyección final
                        productCustomId: { $first: "$productCustomId" }, // Todos los stocks del mismo producto tendrán el mismo custom ID
                        productName: { $first: "$productData.name" }, // Tomamos el nombre del producto de la data unida
                        sellingPrice: { $first: "$productData.sellingPrice" } // Tomamos el precio de venta de la data unida
                    }
                },

                // 5. Proyectar los campos finales y realizar el cálculo del totalAmount
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de grupo
                        productId: "$_id", // El _id del grupo es el productId
                        productCustomId: "$productCustomId", // Del campo mantenido en el $group
                        productName: "$productName", // Del campo mantenido en el $group
                        // Calcular totalAmount: totalQuantity (sumada en el $group) * sellingPrice (preservado en el $group)
                        totalAmount: { $multiply: ["$totalQuantity", "$sellingPrice"] }
                    }
                }
            ];

            const result = await this.ProductStockModel.aggregate(pipeline).exec();

            // Si el producto no existe o no tiene stock en ningún almacén, result será un array vacío
            // Devolvemos el primer (y único) elemento o null
            return result[0] || null;

        } catch (error) {
            console.error(`Error getting total stock monetary value for product ${idProduct}:`, error);
            throw error;
        }
    }




    async getMonetaryValueForSpecificProductInWarehouse( // Nuevo nombre más descriptivo
        idProduct: ObjectIdParam,
        idWarehouse: ObjectIdParam
    ): Promise<AmountTotalStockByProductByWarehouseResponse | null> {
        try {
            const productObjectId = new mongoose.Types.ObjectId(idProduct);
            const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);

            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por ambos IDs (producto y almacén)
                // Gracias a tu índice único compuesto, esto te dará un máximo de un documento.
                {
                    $match: {
                        productId: productObjectId,
                        warehouseId: warehouseObjectId
                    }
                },

                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'name' para productName y 'sellingPrice' para el cálculo
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData" // Array donde se guardará el documento del producto
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que siempre habrá un solo match)
                { $unwind: "$productData" },

                // 4. Lookup para unir con la colección de Almacenes
                // Necesitamos el 'name' para warehouseName
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes en MongoDB
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData" // Array donde se guardará el documento del almacén
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo que siempre habrá un solo match)
                { $unwind: "$warehouseData" },

                // 6. Proyectar los campos finales y realizar el cálculo
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de ProductStock
                        productId: "$productId", // Directamente del documento ProductStock
                        productCustomId: "$productCustomId", // Directamente del documento ProductStock
                        productName: "$productData.name", // Del lookup a Product
                        // Calcular totalAmount: quantity (de ProductStock) * sellingPrice (de ProductData)
                        totalAmount: { $multiply: ["$quantity", "$productData.sellingPrice"] },
                        warehouseId: "$warehouseCustomId", // Tu Zod espera el ID custom del almacén, que está en ProductStock
                        warehouseName: "$warehouseData.name" // Del lookup a Warehouse
                    }
                }
            ];

            const result = await this.ProductStockModel.aggregate(pipeline).exec();

            // Si la combinación product/warehouse no se encuentra (o no tiene stock), el array result estará vacío
            // Devolvemos el primer (y único) elemento o null
            return result[0] || null;

        } catch (error) {
            console.error(
                `Error getting monetary value for product ${idProduct} in warehouse ${idWarehouse}:`,
                error
            );
            throw error;
        }
    }


    async findProductsByStockLevel(status: 'low' | 'overstock' | 'ok', idWarehouse: ObjectIdParam): Promise<StockByStatusResponse[] | null> {
    try {
        const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);
        const pipeline = [
            // 1. Filtrar por el almacén específico.
            {
                $match: {
                    warehouseId: warehouseObjectId
                }
            },
            // --- LOG 1: ¿Cuántos documentos de stock hay para este almacén? ---
            {
                $addFields: { __log1: "Paso 1: match por almacen. Cantidad de documentos:", count: 1 }
            },
            
            // 2. Unir con la colección de Productos (CORRECCIÓN)
            {
                $lookup: {
                    from: "products", // Nombre de tu colección de productos
                    localField: "productId", // <-- CAMBIO CLAVE: Usar 'productId' de ProductStock
                    foreignField: "_id",     // <-- Unir con '_id' del producto
                    as: "productData"
                }
            },
            // --- LOG 2: ¿Los productos se unieron correctamente? ---
            {
                $addFields: { __log2: "Paso 2: lookup a productos. productData es un array vacío si la unión falló.", productDataLength: { $size: "$productData" } }
            },

            // 3. Desestructurar el array productData.
            { $unwind: "$productData" },
            
            // --- LOG 3: ¿Algo sobrevivió al unwind? ---
            {
                $addFields: { __log3: "Paso 3: unwind. Si no se ve este log, el lookup falló." }
            },

            // 4. Filtrar por productos activos.
            {
                $match: {
                    "productData.isActive": true
                }
            },
            // --- LOG 4: ¿Cuántos productos activos hay? ---
            {
                $addFields: { __log4: "Paso 4: match por isActive. Cantidad de productos activos:", isActiveStatus: "$productData.isActive" }
            },

            // 5. Filtrar basado en el estado (low, overstock, ok)
            {
                $match: {
                    $expr: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: [status, "low"] },
                                    then: { $lt: ["$quantity", "$productData.minimumStockLevel"] }
                                },
                                {
                                    case: { $eq: [status, "overstock"] },
                                    then: { $gt: ["$quantity", "$productData.maximumStockLevel"] }
                                },
                                {
                                    case: { $eq: [status, "ok"] },
                                    then: {
                                        $and: [
                                            { $gte: ["$quantity", "$productData.minimumStockLevel"] },
                                            { $lte: ["$quantity", "$productData.maximumStockLevel"] }
                                        ]
                                    }
                                }
                            ],
                            default: false
                        }
                    }
                }
            },
            // --- LOG 5: ¿Cuántos documentos cumplen el estado? ---
            {
                $addFields: { __log5: "Paso 5: match por status. Cantidad final:", statusCheck: "ok" }
            },

            // 6. Proyectar los campos finales para que coincidan con StockByStatusResponse
            {
                $project: {
                    _id: 0,
                    productCustomId: "$productData.idProduct",
                    productName: "$productData.name",
                    quantity: "$quantity",
                    status: status
                }
            }
        ];
        
        const products = await this.ProductStockModel.aggregate(pipeline).exec();

        // Si usas un logger, este es el lugar para imprimir el resultado
        logger.debug(`[ProductStockRepository] Pipeline finalizado. Resultados encontrados: ${products.length}`);
        
        // Ahora tu console.log debería mostrarte los resultados correctos
        console.log(products);

        if (products.length === 0) {
            return [];
        }

        return products as StockByStatusResponse[];

    } catch (error) {
        logger.error(`Error finding products by stock level '${status}' in warehouse ${idWarehouse}:`, error);
        throw error;
    }
}

}