import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../../services/productService";
import { ProductDocument } from "../../../db/models";
import { ProductAlreadyExistsError, ProductCustomIdNotMatchError, ProductDataHasUniqueFieldsAlreadyRegisteredError, ProductNotFoundError, ProductQuantitiesValueError, ProductQuantityWarehouseFormatError, ProductsNotFoundInDatabaseError } from "../../exceptions";

@injectable()
export class ProductValidator {

    constructor(
        @inject("IProductRepository") private readonly productRepository: IProductRepository,
    ) { }

    static validateProductExists(product: ProductDocument): void {

        if (!product) throw new ProductNotFoundError();
    }

    static validateProductsExists(product: ProductDocument[]): void {

        if (product.length < 1) throw new ProductsNotFoundInDatabaseError();
    }

    static validateProductsFormatNumber(data: { purchasePrice?: number; sellingPrice?: number; minimumStockLevel?: number; maximumStockLevel?: number; }): void {

        if (data.purchasePrice < 0 || data.sellingPrice < 0 || data.minimumStockLevel < 0 || data.maximumStockLevel < 0) {

            throw new ProductQuantitiesValueError();
        }
    }

    static validateDataWarehouseStockQuantityItsNotZeroOrNegative(quantity: number): void {

        if (quantity <= 0) {

            throw new ProductQuantityWarehouseFormatError();
        }
    }

    static validateCustomIdProductItsFromTheProduct(customIdProduct: string, customIdProductParam: string): void {

        if (customIdProduct !== customIdProductParam) throw new ProductCustomIdNotMatchError();

    }

    async validateUniquenessProduct(idProduct: string): Promise<void> {

        const product = await this.productRepository.findProductByCustomId(idProduct);

        if (product) throw new ProductAlreadyExistsError();
    }

    async validateUniqueFieldsProduct(data: { sku?: string; barcode?: string; idProduct?: string; name?: string }, excludeId?: string): Promise<void> {

        const validateUniqueFields = await this.productRepository.existsByUniqueField({
            sku: data.sku,
            barcode: data.barcode,
            idProduct: data.idProduct,
            name: data.name,
        });

        if (validateUniqueFields) {
            throw new ProductDataHasUniqueFieldsAlreadyRegisteredError();
        }
    }
}
