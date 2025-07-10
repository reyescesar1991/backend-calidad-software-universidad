import { ClientSession } from "mongoose";
import { ProductDocument } from "../../../db/models";
import { AmountTotalStockByProductByWarehouseResponse, AmountTotalStockByProductResponse, ObjectIdParam, ProductDto, StockByWarehouseResponse, StockTotalByProductResponse, UpdateProductDto } from "../../../validations";

export interface IProductRepository {

    findProductById(idProduct: ObjectIdParam): Promise<ProductDocument | null>;
    findProductByCustomId(customIdProduct: string): Promise<ProductDocument | null>;
    findProductBySku(sku: string): Promise<ProductDocument | null>;
    findProductByBarcode(barcode: string): Promise<ProductDocument | null>;
    findAllProducts(): Promise<ProductDocument[] | null>;
    createProduct(dataCreateProduct: ProductDto, session?: ClientSession): Promise<ProductDocument | null>;
    updateProduct(idProduct: ObjectIdParam, dataUpdateProduct: UpdateProductDto, session?: ClientSession): Promise<ProductDocument | null>;
    activateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null>;
    inactivateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null>;
    getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse | null>;
    getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null>;
    getAmountTotalStockByProductByWarehouse(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam): Promise<AmountTotalStockByProductByWarehouseResponse | null>;
    getAmountTotalStockByProduct(): Promise<AmountTotalStockByProductResponse | null>;
    addStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null>;
    removeStockProduct(idProduct: ObjectIdParam, idWarehouse: ObjectIdParam, quantity: number, session?: ClientSession): Promise<ProductDocument | null>;

    // IProductRepository
    findProductsByStockLevel(status: 'low' | 'overstock' | 'ok'): Promise<ProductDocument[]>;

    // IProductRepository
    findProductsByCriteria(
        criteria: {
            categoryId?: ObjectIdParam;
            supplierId?: ObjectIdParam;
            brand?: string;
            isActive?: boolean;
            searchQuery?: string; // Para búsquedas de texto en nombre, descripción, etc.
        },
        pagination?: {
            page: number;
            limit: number;
        },
        sort?: {
            [key: string]: 1 | -1;
        }
    ): Promise<ProductDocument[]>;

    // IProductRepository
    existsByUniqueField(data: { sku?: string; barcode?: string; idProduct?: string }, excludeId?: ObjectIdParam): Promise<boolean>;
}
