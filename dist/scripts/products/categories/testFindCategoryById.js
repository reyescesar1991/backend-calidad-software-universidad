"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const tsyringe_1 = require("tsyringe");
const productService_1 = require("../../../services/productService");
const dependencies_1 = require("../../../core/config/dependenciesCategories/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindCategoryById = async () => {
    try {
        await (0, dependencies_1.configureCategoriesDependencies)();
        const idCategory = validations_1.objectIdSchema.parse("67f53221794205960e288b6a");
        const productService = tsyringe_1.container.resolve(productService_1.ProductService);
        const result = await productService.findCategoryById(idCategory);
        console.log("📄 Categoria encontrada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindCategoryById().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindCategoryById.js.map