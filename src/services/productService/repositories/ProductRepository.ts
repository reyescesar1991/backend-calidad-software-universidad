import { ClientSession, FilterQuery, Model, SortOrder } from "mongoose";
import { ProductDocument } from "../../../db/models";
import { ObjectIdParam, ProductDto, UpdateProductDto, StockByWarehouseResponse, StockTotalByProductResponse, AmountTotalStockByProductByWarehouseResponse, AmountTotalStockByProductResponse } from "../../../validations";
import { IProductRepository } from "../interfaces/IProductRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProductRepositoryImpl implements IProductRepository {

    constructor(
        @inject("ProductModel") private readonly ProductModel: Model<ProductDocument>,
    ) { }

    async findProductById(idProduct: ObjectIdParam): Promise<ProductDocument | null> {

        return await this.ProductModel.findById(idProduct).exec();
    }

    async findProductByCustomId(customIdProduct: string): Promise<ProductDocument | null> {

        return await this.ProductModel.findOne({ idProduct: customIdProduct }).exec();
    }

    async findProductBySku(sku: string): Promise<ProductDocument | null> {

        return await this.ProductModel.findOne({ sku }).exec();
    }

    async findProductByBarcode(barcode: string): Promise<ProductDocument | null> {

        return await this.ProductModel.findOne({ barcode }).exec();
    }

    async findAllProducts(): Promise<ProductDocument[] | null> {

        return await this.ProductModel.find({}).exec();
    }

    async createProduct(dataCreateProduct: ProductDto, session?: ClientSession): Promise<ProductDocument | null> {

        const [product] = await this.ProductModel.create([dataCreateProduct], { session });

        return product;

    }

    async updateProduct(idProduct: ObjectIdParam, dataUpdateProduct: UpdateProductDto, session?: ClientSession): Promise<ProductDocument | null> {

        return await this.ProductModel.findByIdAndUpdate(
            idProduct,
            dataUpdateProduct,
            { new: true, runValidators: true, session }
        ).exec();
    }

    async activateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {

        return await this.ProductModel.findByIdAndUpdate(
            idProduct,
            { $set: { isActive: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async inactivateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {

        return await this.ProductModel.findByIdAndUpdate(
            idProduct,
            { $set: { isActive: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse[] | null> {

        try {
            const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);

            const pipeline = [
                // 1. Filtrar los productos que tienen stock en el almacén de interés
                { $match: { 'warehouseStock.warehouseId': warehouseObjectId } },

                // 2. Desestructurar el array warehouseStock para procesar cada item individualmente
                { $unwind: "$warehouseStock" },

                // 3. Filtrar de nuevo para quedarnos solo con el subdocumento del almacén de interés
                { $match: { 'warehouseStock.warehouseId': warehouseObjectId } },

                // 4. Unir (JOIN) con la colección de almacenes para obtener el nombre
                {
                    $lookup: {
                        from: "warehouses", // Nombre de la colección de almacenes en la DB
                        localField: "warehouseStock.warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },

                // 5. Desestructurar el array de datos del almacén (resultado del lookup)
                { $unwind: "$warehouseData" },

                // 6. Proyectar y Renombrar campos para que coincidan con el esquema Zod
                {
                    $project: {
                        // _id: 0, // Puedes omitir el _id si lo deseas
                        quantity: "$warehouseStock.quantity",
                        productCustomId: "$idProduct", // Mapear 'idProduct' a 'productCustomId'
                        productName: "$name", // Mapear 'name' a 'productName'
                        warehouseId: "$warehouseData.idWarehouse", // Asumiendo que el ID del almacén es "idWarehouse"
                        warehouseName: "$warehouseData.name", // Mapear el nombre del almacén
                    }
                }
            ];

            const results = await this.ProductModel.aggregate(pipeline).exec();

            // Asegurar que el array no esté vacío
            if (results.length === 0) {
                return null;
            }

            // Aquí ya tienes un array de objetos planos que coinciden con el esquema de Zod
            return results as StockByWarehouseResponse[];

        } catch (error) {
            console.error(`Error getting stock for warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }

    async getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null> {
        try {
            const pipeline = [
                // 1. Filtrar la colección para encontrar solo el producto específico
                {
                    $match: { _id: new mongoose.Types.ObjectId(idProduct) }
                },
                // 2. Calcular la cantidad total y proyectar los campos con los nombres correctos
                {
                    $project: {
                        _id: 0, // Omitimos el _id temporalmente para renombrarlo
                        productId: "$_id",
                        productCustomId: "$sku", // Mapeamos 'sku' a 'productCustomId'
                        productName: "$name",    // Mapeamos 'name' a 'productName'
                        quantity: {
                            $sum: "$warehouseStock.quantity"
                        }
                    }
                }
            ];

            const result = await this.ProductModel.aggregate(pipeline).exec();

            // Si no se encuentra el producto, el resultado será un array vacío
            if (result.length === 0) {
                return null;
            }

            // Mongoose devuelve un array, por lo que el tipo de retorno es correcto
            return result as StockTotalByProductResponse[];
        } catch (error) {
            console.error(`Error getting total stock for product ${idProduct}:`, error);
            throw error;
        }
    }

    async getTotalStockMonetaryValueByWarehouse(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam): Promise<AmountTotalStockByProductByWarehouseResponse | null> {

        try {
            const productObjectId = new mongoose.Types.ObjectId(idProduct);
            const warehouseObjectId = new mongoose.Types.ObjectId(idWarehouse);

            const pipeline = [
                // Paso 1: Match por el ID del producto
                { $match: { _id: productObjectId } },

                // Paso 2: Unwind para desestructurar el array warehouseStock
                { $unwind: "$warehouseStock" },

                // Paso 3: Match para obtener solo el stock del almacén de interés
                { $match: { "warehouseStock.warehouseId": warehouseObjectId } },

                // Paso 4: Lookup para unir con la colección de almacenes
                {
                    $lookup: {
                        from: "warehouses",
                        localField: "warehouseStock.warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },

                // Paso 5: Unwind del resultado del lookup
                { $unwind: "$warehouseData" },

                // Paso 6 y 7: Cálculo del valor total y proyección final
                {
                    $project: {
                        _id: 0,
                        productId: "$_id",
                        productCustomId: "$sku",
                        productName: "$name",
                        // Cálculo: cantidad * precio
                        totalAmount: { $multiply: ["$warehouseStock.quantity", "$sellingPrice"] },
                        warehouseId: "$warehouseData.idWarehouse",
                        warehouseName: "$warehouseData.name",
                    }
                }
            ];

            const result = await this.ProductModel.aggregate(pipeline).exec();

            return result[0] || null;

        } catch (error) {
            console.error(`Error getting total stock amount for product ${idProduct} in warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }

    async getAmountTotalStockByProduct(idProduct: ObjectIdParam): Promise<AmountTotalStockByProductResponse | null> {
        try {
            const productObjectId = new mongoose.Types.ObjectId(idProduct);

            const pipeline = [
                // 1. Filtrar para obtener solo el producto de interés
                {
                    $match: { _id: productObjectId }
                },
                // 2. Calcular el valor total de stock para ese producto y proyectar los campos necesarios
                {
                    $project: {
                        _id: 0,
                        productId: "$_id",
                        productCustomId: "$idProduct",
                        productName: "$name",
                        // Cálculo: suma de cantidad * precio
                        totalAmount: {
                            $multiply: ["$sellingPrice", { $sum: "$warehouseStock.quantity" }]
                        }
                    }
                }
            ];

            const result = await this.ProductModel.aggregate(pipeline).exec();

            // El resultado es un array de un solo elemento (o vacío si el producto no existe)
            // Por lo tanto, tomamos el primer elemento o devolvemos null
            return result[0] || null;
        } catch (error) {
            console.error(`Error getting total stock amount for product ${idProduct}:`, error);
            throw error;
        }
    }

    async addStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null> {
        try {
            const productId = new mongoose.Types.ObjectId(idProduct);
            const warehouseId = new mongoose.Types.ObjectId(idWarehouse);

            const filter = {
                _id: productId,
                "warehouseStock.warehouseId": warehouseId
            };

            const update = {
                // $inc es el operador para "incrementar" un valor en el documento.
                // Le pasamos un número positivo para lograr la resta.
                // El '$' es el operador posicional, que actualiza el subdocumento que coincidió en el filtro.
                $inc: {
                    "warehouseStock.$.quantity": quantity
                }
            };

            const options = {
                session, // Para la transacción
                new: true // Mongoose devuelve el documento actualizado, no el original
            };

            const updatedProduct = await this.ProductModel.findOneAndUpdate(filter, update, options);

            // findOneAndUpdate devuelve null si no se encontró un documento que coincida
            return updatedProduct;

        } catch (error) {
            console.error(`Error adding stock from product ${idProduct} in warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }

    async removeStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null> {
        try {
            const productId = new mongoose.Types.ObjectId(idProduct);
            const warehouseId = new mongoose.Types.ObjectId(idWarehouse);

            const filter = {
                _id: productId,
                "warehouseStock.warehouseId": warehouseId
            };

            const update = {
                // $inc es el operador para "incrementar" un valor en el documento.
                // Le pasamos un número negativo para lograr la resta.
                // El '$' es el operador posicional, que actualiza el subdocumento que coincidió en el filtro.
                $inc: {
                    "warehouseStock.$.quantity": -quantity
                }
            };

            const options = {
                session, // Para la transacción
                new: true // Mongoose devuelve el documento actualizado, no el original
            };

            const updatedProduct = await this.ProductModel.findOneAndUpdate(filter, update, options);

            // findOneAndUpdate devuelve null si no se encontró un documento que coincida
            return updatedProduct;
        } catch (error) {
            console.error(`Error removing stock from product ${idProduct} in warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }

    async findProductsByStockLevel(status: 'low' | 'overstock' | 'ok'): Promise<ProductDocument[] | null> {
        // Pipeline de agregación
        const pipeline = [
            // 1. Sumar la cantidad de stock de todos los almacenes para cada producto
            {
                $project: {
                    _id: 1,
                    name: 1,
                    minimumStockLevel: 1,
                    maximumStockLevel: 1,
                    totalQuantity: {
                        $sum: "$warehouseStock.quantity"
                    }
                }
            },
            // 2. Filtrar basado en el estado (low, overstock, ok)
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$isActive", true] }, // Asegura que solo buscamos productos activos
                            {
                                $switch: {
                                    branches: [
                                        {
                                            case: { $eq: [status, "low"] },
                                            then: { $lt: ["$totalQuantity", "$minimumStockLevel"] }
                                        },
                                        {
                                            case: { $eq: [status, "overstock"] },
                                            then: { $gt: ["$totalQuantity", "$maximumStockLevel"] }
                                        },
                                        {
                                            case: { $eq: [status, "ok"] },
                                            then: {
                                                $and: [
                                                    { $gte: ["$totalQuantity", "$minimumStockLevel"] },
                                                    { $lte: ["$totalQuantity", "$maximumStockLevel"] }
                                                ]
                                            }
                                        }
                                    ],
                                    default: false
                                }
                            }
                        ]
                    }
                }
            }
        ];

        // Ejecutar el pipeline de agregación y devolver los resultados
        // Mongoose Aggregate produce un tipo de retorno complejo, el cast es para simplificar.
        return await this.ProductModel.aggregate(pipeline).exec() as ProductDocument[];
    }


    // En ProductRepositoryImpl
    async findProductsByCriteria(
        criteria: {
            categoryId?: ObjectIdParam;
            supplierId?: ObjectIdParam;
            brand?: string;
            isActive?: boolean;
            searchQuery?: string;
        },
        pagination: {
            page: number;
            limit: number;
        } = { page: 1, limit: 20 },
        sort: {
            [key: string]: 1 | -1;
        } = { name: 1 }
    ): Promise<ProductDocument[]> {
        const query: FilterQuery<ProductDocument> = {};

        if (criteria.categoryId) query.categoryId = criteria.categoryId;
        if (criteria.supplierId) query.supplierId = criteria.supplierId;
        if (criteria.brand) query.brand = criteria.brand;
        if (typeof criteria.isActive === 'boolean') query.isActive = criteria.isActive;

        if (criteria.searchQuery) {
            query.$or = [
                { name: { $regex: criteria.searchQuery, $options: 'i' } },
                { description: { $regex: criteria.searchQuery, $options: 'i' } },
                { sku: { $regex: criteria.searchQuery, $options: 'i' } },
                { barcode: { $regex: criteria.searchQuery, $options: 'i' } },
            ];
        }

        const skip = (pagination.page - 1) * pagination.limit;

        return await this.ProductModel.find(query)
            .sort(sort as { [key: string]: SortOrder })
            .skip(skip)
            .limit(pagination.limit)
            .exec();
    }

    // En ProductRepositoryImpl
    async existsByUniqueField(data, excludeId?: ObjectIdParam): Promise<boolean> {
        const query: FilterQuery<ProductDocument> = { $or: [] };
        if (data.sku) query.$or.push({ sku: data.sku });
        if (data.barcode) query.$or.push({ barcode: data.barcode });
        if (data.idProduct) query.$or.push({ idProduct: data.idProduct });

        if (query.$or.length === 0) return false;

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const count = await this.ProductModel.countDocuments(query).exec();
        return count > 0;
    }
}