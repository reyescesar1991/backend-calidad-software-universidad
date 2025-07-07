import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { CategoryProductModel } from "../../../db/models";
import { CategoryRepositoryImpl, ICategoryProductRepository } from "../../../services/productService";
import { CategoryProductValidator } from "../../validators";


export const configureCategoriesDependencies = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("CategoryProductModel", {useValue : CategoryProductModel});

    container.register<ICategoryProductRepository>("ICategoryProductRepository", {useClass : CategoryRepositoryImpl});

    container.register("CategoryProductValidator", {useClass : CategoryProductValidator});
}