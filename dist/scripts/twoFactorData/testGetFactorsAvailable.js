"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const tsyringe_1 = require("tsyringe");
const oauthService_1 = require("../../services/oauthService");
(0, connectDb_1.initializeTestEnvironment)();
const runTestGetFactorsAvailable = async () => {
    try {
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        const twoFactorService = tsyringe_1.container.resolve(oauthService_1.TwoFactorService);
        const result = await twoFactorService.getFactorsAvailable();
        console.log("📄 Factores de autenticación disponibles:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestGetFactorsAvailable().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testGetFactorsAvailable.js.map