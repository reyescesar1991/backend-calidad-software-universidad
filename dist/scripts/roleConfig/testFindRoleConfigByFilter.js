"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesRoleConfig/dependencies");
const tsyringe_1 = require("tsyringe");
const roleConfig_service_1 = require("../../services/roleConfig/roleConfig.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindRoleConfigByFilter = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoleConfig)();
        const rolConfigFilter = {
            maxLoginAttempts: 5
        };
        const roleConfigService = tsyringe_1.container.resolve(roleConfig_service_1.RoleConfigService);
        const result = await roleConfigService.searchConfigRoleByFilter(rolConfigFilter);
        console.log("📄 Configuración de Role encontrada por filtro:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindRoleConfigByFilter().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindRoleConfigByFilter.js.map