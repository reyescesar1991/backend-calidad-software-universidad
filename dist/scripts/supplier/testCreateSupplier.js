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
const runTestCreateSupplier = async () => {
    try {
        await (0, dependencies_1.configureSuppliersDependencies)();
        await (0, dependencies_2.configurePaymentTermsDependencies)();
        const dataSupplier = {
            id: "SUP-COL-005",
            name: "test name",
            tradeName: "test trade name",
            contactPerson: "test contact person",
            phoneNumber: "+57-304-234-6542",
            email: "infoTest@carnespremium.co",
            address: "test address",
            city: "test city",
            state: "test state",
            zipCode: "050021",
            country: "test country",
            taxId: "890.987.654-2",
            businessRegistrationNumber: "00987654",
            paymentTerm: validations_1.objectIdSchema.parse("67e59b7a75973ad506ea487f"),
            isActive: true,
            notes: "test notes",
        };
        const supplierService = tsyringe_1.container.resolve(Supplier_service_1.SupplierService);
        const result = await supplierService.createSupplier(dataSupplier);
        console.log("📄 Proveedor creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateSupplier().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateSupplier.js.map