import { ClientSession } from "mongoose";
import { ProductDocument, ProductStockDocument } from "../../../db/models";
import { AmountTotalByWarehouseResponse, AmountTotalStockByProductByWarehouseResponse, AmountTotalStockByProductResponse, ObjectIdParam, ProductStockDto, StockByStatusResponse, StockByWarehouseResponse, StockTotalByProductResponse, UpdateProductStockDto } from "../../../validations";

export interface IProductStockRepository {

    findProductStockByProductId(idProduct: ObjectIdParam): Promise<ProductStockDocument[] | null>;
    findProductByProductCustomId(customIdProduct: string): Promise<ProductStockDocument[] | null>;
    findProductStockByProductIdAndWarehouseId(customIdProduct: string, customIdWarehouse: string): Promise<ProductStockDocument | null>;
    findProductByWarehouseId(idWarehouse: ObjectIdParam): Promise<ProductStockDocument[] | null>;
    findProductByWarehouseCustomId(customIdWarehouse: string): Promise<ProductStockDocument[] | null>;
    findAllProductsStock(): Promise<ProductStockDocument[] | null>;
    createProductStock(dataCreateProductStock: ProductStockDto, session?: ClientSession): Promise<ProductStockDocument | null>;
    updateProductStock(idProduct: string, idWarehouse: string, dataUpdateProductStock: UpdateProductStockDto, session?: ClientSession): Promise<ProductStockDocument | null>;
    activateProductInWarehouse(customIdProduct: string, idWarehouse: string, session?: ClientSession): Promise<ProductStockDocument | null>;
    inactivateProductInWarehouse(customIdProduct: string, idWarehouse: string, session?: ClientSession): Promise<ProductStockDocument | null>;
    addStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null>;
    removeStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null>;
    getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse[] | null>;
    getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null>;
    getTotalStockMonetaryValueByWarehouse(idWarehouse: ObjectIdParam): Promise<AmountTotalByWarehouseResponse | null>;
    getAmountTotalStockByProduct(idProduct: ObjectIdParam): Promise<AmountTotalStockByProductResponse | null>;
    getMonetaryValueForSpecificProductInWarehouse( // Nuevo nombre más descriptivo
        idProduct: ObjectIdParam,
        idWarehouse: ObjectIdParam
    ): Promise<AmountTotalStockByProductByWarehouseResponse | null>

    // IProductRepository
    findProductsByStockLevel(status: 'low' | 'overstock' | 'ok'): Promise<StockByStatusResponse[] | null>
}
