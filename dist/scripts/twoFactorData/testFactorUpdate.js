"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const tsyringe_1 = require("tsyringe");
const oauthService_1 = require("../../services/oauthService");
const validations_1 = require("../../validations");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdateFactor = async () => {
    try {
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        const idFactor = validations_1.objectIdSchema.parse("6841f4b07408799cb009a41a");
        const dataUpdate = {
            method: "test2",
        };
        const twoFactorService = tsyringe_1.container.resolve(oauthService_1.TwoFactorService);
        const result = await twoFactorService.updateFactor(idFactor, dataUpdate);
        console.log("📄 Factor de autenticación encontrado y actualizado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateFactor().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFactorUpdate.js.map