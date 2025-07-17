"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesRoleConfig/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const roleConfig_service_1 = require("../../services/roleConfig/roleConfig.service");
const dependencies_2 = require("../../core/config/dependenciesRoles/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdateRoleConfig = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoleConfig)();
        await (0, dependencies_2.configureDependenciesRoles)();
        const idConfigRole = validations_1.objectIdSchema.parse("68263fc7f016933bfed2ec24");
        const rolConfig = {
            maxLoginAttempts: 2,
            rolName: "Test rol name config"
        };
        const roleConfigService = tsyringe_1.container.resolve(roleConfig_service_1.RoleConfigService);
        const result = await roleConfigService.updateConfigRole(idConfigRole, rolConfig);
        console.log("📄 Configuración de Role encontrada y actualizada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateRoleConfig().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateRoleConfig.js.map