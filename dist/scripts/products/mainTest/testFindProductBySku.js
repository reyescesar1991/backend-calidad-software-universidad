"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../../core/utils/connectDb");
const tsyringe_1 = require("tsyringe");
const productService_1 = require("../../../services/productService");
const dependencies_1 = require("../../../core/config/dependenciesCategories/dependencies");
const dependencies_2 = require("../../../core/config/dependenciesProducts/dependencies");
const dependencies_3 = require("../../../core/config/dependenciesSuppliers/dependencies");
const dependencies_4 = require("../../../core/config/dependenciesPaymentTerms/dependencies");
const dependencies_5 = require("../../../core/config/dependenciesHeadquarters/dependencies");
const dependencies_6 = require("../../../core/config/dependenciesDepartments/dependencies");
const dependencies_7 = require("../../../core/config/dependenciesWarehouses/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindProductBySku = async () => {
    try {
        await (0, dependencies_1.configureCategoriesDependencies)();
        await (0, dependencies_2.configureProductDependencies)();
        await (0, dependencies_3.configureSuppliersDependencies)();
        await (0, dependencies_4.configurePaymentTermsDependencies)();
        await (0, dependencies_5.configureDependenciesHeadquarters)();
        await (0, dependencies_6.configureDependenciesDepartments)();
        await (0, dependencies_7.configureWarehouseDependencies)();
        const productSku = "FRU-MANZANAINC-12345678";
        const productService = tsyringe_1.container.resolve(productService_1.ProductService);
        const result = await productService.findProductBySku(productSku);
        console.log("📄 Producto encontrado por Sku:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindProductBySku().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindProductBySku.js.map