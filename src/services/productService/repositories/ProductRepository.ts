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