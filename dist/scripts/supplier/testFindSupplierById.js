"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const Supplier_service_1 = require("../../services/supplierService/Supplier.service");
const dependencies_1 = require("../../core/config/dependenciesSuppliers/dependencies");
const dependencies_2 = require("../../core/config/dependenciesPaymentTerms/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindSupplierById = async () => {
    try {
        await (0, dependencies_1.configureSuppliersDependencies)();
        await (0, dependencies_2.configurePaymentTermsDependencies)();
        const idSupplierTerm = validations_1.objectIdSchema.parse("67e701d40d06e2ab18b4172d");
        const supplierService = tsyringe_1.container.resolve(Supplier_service_1.SupplierService);
        const result = await supplierService.findSupplierById(idSupplierTerm);
        console.log("📄 Proveedor encontrado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindSupplierById().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindSupplierById.js.map