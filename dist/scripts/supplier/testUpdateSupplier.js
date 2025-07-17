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
const runTestUpdateSupplier = async () => {
    try {
        await (0, dependencies_1.configureSuppliersDependencies)();
        await (0, dependencies_2.configurePaymentTermsDependencies)();
        const idSupplier = validations_1.objectIdSchema.parse("686bdd723f3c8e2924f21135");
        const dataSupplier = {
            name: "test name update",
            tradeName: "test trade name update",
            contactPerson: "test contact person update",
            phoneNumber: "+57-304-234-6541",
            email: "infoTestUpdate@carnespremium.co",
            address: "test address update",
            city: "test city update",
            state: "test state update",
            zipCode: "050021",
            country: "test country update",
            paymentTerm: validations_1.objectIdSchema.parse("686bcf74180cfbe5e8058243"),
            isActive: false,
            notes: "test notes update",
        };
        const supplierService = tsyringe_1.container.resolve(Supplier_service_1.SupplierService);
        const result = await supplierService.updateSupplier(idSupplier, dataSupplier);
        console.log("📄 Proveedor actualizado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateSupplier().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateSupplier.js.map