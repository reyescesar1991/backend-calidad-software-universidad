import { inject, injectable } from "tsyringe";
import { IProductStockRepository } from "../../../services/productService";
import { ProductStockDocument } from "../../../db/models";
import { ProductsInStockNotFoundError, ProductStockAlreadyExistsError, ProductStockNotExistsError, ProductStockNotFoundError, ProductStockQuantityError } from "../../exceptions";
import { ProductStockAlreadyActiveError, ProductStockAlreadyInactiveError } from "../../exceptions/products/productsStock.exception";

@injectable()
export class ProductStockValidator {

    constructor(
        @inject("IProductStockRepository") private readonly productRepository: IProductStockRepository,
    ) { }

    static validateProductStockExists(product: ProductStockDocument): void {

        if (!product) throw new ProductStockNotFoundError();
    }

    static validateStockProductQuantityMoreThanZero(quantity: number): void {

        if(quantity < 0) throw new ProductStockQuantityError()
    }

    static validateProductsInStockExists(product: ProductStockDocument[]): void {

        if (product.length < 1) throw new ProductsInStockNotFoundError();
    }

    static validateProductAlreadyIsActive(product) : void {

        if(product.statusInWarehouse) throw new ProductStockAlreadyActiveError();
    }   

    static validateProductAlreadyIsInactive(product) : void {

        if(!product.statusInWarehouse) throw new ProductStockAlreadyInactiveError();
    } 

    async validateProductStockUniqueness(customIdProduct : string, customIdWarehouse : string): Promise<void>{

        const productStock = await this.productRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, customIdWarehouse);

        if(productStock) throw new ProductStockAlreadyExistsError();
    
    }

    async validateProductStockExists(customIdProduct : string, customIdWarehouse : string): Promise<void>{

        const productStock = await this.productRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, customIdWarehouse);

        if(!productStock) throw new ProductStockNotExistsError();
    
    }

    
}