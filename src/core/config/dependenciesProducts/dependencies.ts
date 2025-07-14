import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { ProductModel, ProductStockModel } from "../../../db/models";
import { IProductRepository, IProductStockRepository, ProductRepositoryImpl, ProductService, ProductStockRepositoryImpl, ProductStockService } from "../../../services/productService";
import { CategoryProductValidator, ProductStockValidator, ProductValidator } from "../../validators";



export const configureProductDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    
    container.register("ProductModel", { useValue: ProductModel });
    container.register("ProductStockModel", { useValue: ProductStockModel });

    container.register<IProductRepository>("IProductRepository", { useClass: ProductRepositoryImpl });
    container.register<IProductStockRepository>("IProductStockRepository", { useClass: ProductStockRepositoryImpl });


    container.register("CategoryProductValidator", { useClass: CategoryProductValidator });
    container.register("ProductStockValidator", { useClass: ProductStockValidator });
    container.register("ProductValidator", { useClass: ProductValidator });

    container.register("ProductStockService", {useClass : ProductStockService});
    container.register("ProductService", {useClass : ProductService});
}