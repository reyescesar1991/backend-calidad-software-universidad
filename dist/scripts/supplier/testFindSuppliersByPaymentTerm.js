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
const runTestFindSupplierByPaymentTerm = async () => {
    try {
        await (0, dependencies_1.configureSuppliersDependencies)();
        await (0, dependencies_2.configurePaymentTermsDependencies)();
        const idSupplierPaymentTerm = validations_1.objectIdSchema.parse("67e59b7a75973ad506ea487c");
        const supplierService = tsyringe_1.container.resolve(Supplier_service_1.SupplierService);
        const result = await supplierService.findSuppliersByPaymentTerm(idSupplierPaymentTerm);
        console.log(`📄 Proveedores con el termino de pago ${idSupplierPaymentTerm}:`, result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindSupplierByPaymentTerm().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindSuppliersByPaymentTerm.js.map