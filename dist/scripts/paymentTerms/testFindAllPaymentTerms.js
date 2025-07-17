"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesPaymentTerms/dependencies");
const generalDataService_1 = require("../../services/generalDataService");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindAllPaymentTerms = async () => {
    try {
        await (0, dependencies_1.configurePaymentTermsDependencies)();
        const generalDataService = tsyringe_1.container.resolve(generalDataService_1.GeneralDataService);
        const result = await generalDataService.findAllPaymentTerms();
        console.log("📄 Terminos de pago encontrados:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindAllPaymentTerms().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindAllPaymentTerms.js.map