"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const tsyringe_1 = require("tsyringe");
const oauthService_1 = require("../../services/oauthService");
const validations_1 = require("../../validations");
(0, connectDb_1.initializeTestEnvironment)();
const runTestEnableFactor = async () => {
    try {
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        const idFactor = validations_1.objectIdSchema.parse("67e9e6c034fe5c9d5ab4acf0");
        const twoFactorService = tsyringe_1.container.resolve(oauthService_1.TwoFactorService);
        const result = await twoFactorService.enableFactor(idFactor);
        console.log("📄 Factor de autenticación activado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestEnableFactor().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testEnableFactor.js.map