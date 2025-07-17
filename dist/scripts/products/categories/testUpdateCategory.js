"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const tsyringe_1 = require("tsyringe");
const productService_1 = require("../../../services/productService");
const dependencies_1 = require("../../../core/config/dependenciesCategories/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdateCategory = async () => {
    try {
        await (0, dependencies_1.configureCategoriesDependencies)();
        const idCategory = validations_1.objectIdSchema.parse("686c291869c01867f3725034");
        const dataCreateCategory = {
            label: "Test Update",
            name: "Test Update",
            slug: "Test Update",
            description: "Test Update",
        };
        const productService = tsyringe_1.container.resolve(productService_1.ProductService);
        const result = await productService.updateCategory(idCategory, dataCreateCategory);
        console.log("📄 Categoria encontrada y actualizada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateCategory().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateCategory.js.map