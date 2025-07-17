"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const tsyringe_1 = require("tsyringe");
const productService_1 = require("../../../services/productService");
const dependencies_1 = require("../../../core/config/dependenciesCategories/dependencies");
const dependencies_2 = require("../../../core/config/dependenciesProducts/dependencies");
const dependencies_3 = require("../../../core/config/dependenciesSuppliers/dependencies");
const dependencies_4 = require("../../../core/config/dependenciesPaymentTerms/dependencies");
const dependencies_5 = require("../../../core/config/dependenciesHeadquarters/dependencies");
const dependencies_6 = require("../../../core/config/dependenciesDepartments/dependencies");
const dependencies_7 = require("../../../core/config/dependenciesWarehouses/dependencies");
const enums_1 = require("../../../core/enums");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreateProduct = async () => {
    try {
        await (0, dependencies_1.configureCategoriesDependencies)();
        await (0, dependencies_2.configureProductDependencies)();
        await (0, dependencies_3.configureSuppliersDependencies)();
        await (0, dependencies_4.configurePaymentTermsDependencies)();
        await (0, dependencies_5.configureDependenciesHeadquarters)();
        await (0, dependencies_6.configureDependenciesDepartments)();
        await (0, dependencies_7.configureWarehouseDependencies)();
        const productData = {
            idProduct: "PROD00007",
            name: "Test Product",
            description: "Test Product",
            sku: "OTR-TestProduct-12345678",
            barcode: "00010923",
            categoryId: validations_1.objectIdSchema.parse("686c291869c01867f3725034"),
            supplierId: validations_1.objectIdSchema.parse("686bdd723f3c8e2924f21135"),
            brand: "Test Brand",
            purchasePrice: .99,
            sellingPrice: 2.69,
            currency: enums_1.CurrencyEnum.DOLARES,
            minimumStockLevel: 5,
            maximumStockLevel: 300,
            unitOfMeasure: enums_1.UnitMeasureEnum.PALLET,
            imageUrl: "test/Url",
            updatedAt: new Date(Date.now()),
            isActive: true,
            notes: "test notes",
        };
        const productService = tsyringe_1.container.resolve(productService_1.ProductService);
        const result = await productService.createProduct(productData);
        console.log("📄 Productos creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateProduct().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateProduct.js.map