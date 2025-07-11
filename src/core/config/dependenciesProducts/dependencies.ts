import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { ProductModel } from "../../../db/models";
import { IProductRepository, ProductRepositoryImpl } from "../../../services/productService";
import { ProductValidator } from "../../validators";



export const configureProductDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    
    container.register("ProductModel", { useValue: ProductModel });

    container.register<IProductRepository>("IProductRepository", { useClass: ProductRepositoryImpl });

    container.register("CategoryProductValidator", { useClass: ProductValidator });
}