"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesPaymentTerms/dependencies");
const generalDataService_1 = require("../../services/generalDataService");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindPaymentTermByCustomId = async () => {
    try {
        await (0, dependencies_1.configurePaymentTermsDependencies)();
        const idPaymentTerm = "CREDITO30";
        const generalDataService = tsyringe_1.container.resolve(generalDataService_1.GeneralDataService);
        const result = await generalDataService.findPaymentTermByCustomId(idPaymentTerm);
        console.log("📄 Termino de pago encontrado por custom id:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindPaymentTermByCustomId().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindPaymentTermByCustomId.js.map