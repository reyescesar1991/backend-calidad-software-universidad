"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../../core/utils/connectDb");
const tsyringe_1 = require("tsyringe");
const productService_1 = require("../../../services/productService");
const dependencies_1 = require("../../../core/config/dependenciesCategories/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindCategoryByLabel = async () => {
    try {
        await (0, dependencies_1.configureCategoriesDependencies)();
        const labelCategory = "Verduras";
        const productService = tsyringe_1.container.resolve(productService_1.ProductService);
        const result = await productService.findCategoryByLabel(labelCategory);
        console.log("📄 Categoria encontrada por etiqueta:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindCategoryByLabel().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindCategoryByLabel.js.map