"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureProductDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const productService_1 = require("../../../services/productService");
const validators_1 = require("../../validators");
const configureProductDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("ProductModel", { useValue: models_1.ProductModel });
    tsyringe_1.container.register("ProductStockModel", { useValue: models_1.ProductStockModel });
    tsyringe_1.container.register("IProductRepository", { useClass: productService_1.ProductRepositoryImpl });
    tsyringe_1.container.register("IProductStockRepository", { useClass: productService_1.ProductStockRepositoryImpl });
    tsyringe_1.container.register("CategoryProductValidator", { useClass: validators_1.CategoryProductValidator });
    tsyringe_1.container.register("ProductStockValidator", { useClass: validators_1.ProductStockValidator });
    tsyringe_1.container.register("ProductValidator", { useClass: validators_1.ProductValidator });
    tsyringe_1.container.register("ProductStockService", { useClass: productService_1.ProductStockService });
    tsyringe_1.container.register("ProductService", { useClass: productService_1.ProductService });
};
exports.configureProductDependencies = configureProductDependencies;
//# sourceMappingURL=dependencies.js.map