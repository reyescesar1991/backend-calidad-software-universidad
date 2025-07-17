"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureCategoriesDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const productService_1 = require("../../../services/productService");
const validators_1 = require("../../validators");
const configureCategoriesDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("CategoryProductModel", { useValue: models_1.CategoryProductModel });
    tsyringe_1.container.register("ICategoryProductRepository", { useClass: productService_1.CategoryRepositoryImpl });
    tsyringe_1.container.register("CategoryProductValidator", { useClass: validators_1.CategoryProductValidator });
};
exports.configureCategoriesDependencies = configureCategoriesDependencies;
//# sourceMappingURL=dependencies.js.map