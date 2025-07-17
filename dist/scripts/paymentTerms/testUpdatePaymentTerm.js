"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesPaymentTerms/dependencies");
const generalDataService_1 = require("../../services/generalDataService");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdatePaymentTerm = async () => {
    try {
        await (0, dependencies_1.configurePaymentTermsDependencies)();
        const idPaymentTerm = validations_1.objectIdSchema.parse("686bcf74180cfbe5e8058243");
        const dataPaymentTerm = {
            name: "payment term name update",
            description: "payment term description update",
            daysToPay: 10,
            discount: 7,
            isActive: true
        };
        const generalDataService = tsyringe_1.container.resolve(generalDataService_1.GeneralDataService);
        const result = await generalDataService.updatePaymentTerm(idPaymentTerm, dataPaymentTerm);
        console.log("📄 Termino de pago actualizado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdatePaymentTerm().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdatePaymentTerm.js.map