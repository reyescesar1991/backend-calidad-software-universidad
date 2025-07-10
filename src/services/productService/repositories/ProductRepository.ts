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

    findProductById(idProduct: ObjectIdParam): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    findProductByCustomId(customIdProduct: string): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    findProductBySku(sku: string): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    findProductByBarcode(barcode: string): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    findAllProducts(): Promise<ProductDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    createProduct(dataCreateProduct: ProductDto, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    updateProduct(idProduct: ObjectIdParam, dataUpdateProduct: UpdateProductDto, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    activateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    inactivateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse | null> {
        throw new Error("Method not implemented.");
    }
    getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null> {
        throw new Error("Method not implemented.");
    }
    getAmountTotalStockByProductByWarehouse(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam): Promise<AmountTotalStockByProductByWarehouseResponse | null> {
        throw new Error("Method not implemented.");
    }
    getAmountTotalStockByProduct(): Promise<AmountTotalStockByProductResponse | null> {
        throw new Error("Method not implemented.");
    }
    addStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
    }
    removeStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null> {
        throw new Error("Method not implemented.");
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