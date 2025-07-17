"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const tsyringe_1 = require("tsyringe");
const oauthService_1 = require("../../services/oauthService");
(0, connectDb_1.initializeTestEnvironment)();
const runTestAddFactor = async () => {
    try {
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        const dataFactor = {
            method: "test",
            isEnabled: true,
            quantityUsers: 0,
        };
        const twoFactorService = tsyringe_1.container.resolve(oauthService_1.TwoFactorService);
        const result = await twoFactorService.addFactor(dataFactor);
        console.log("📄 Factor de autenticación agregado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestAddFactor().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFactorAdd.js.map