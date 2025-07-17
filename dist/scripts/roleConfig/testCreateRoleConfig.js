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
const runTestCreateRoleConfig = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoleConfig)();
        await (0, dependencies_2.configureDependenciesRoles)();
        const rolConfig = {
            rolID: validations_1.objectIdSchema.parse("681cbf83983a4218cb3de525"),
            maxLoginAttempts: 1,
            isActive: true,
            rolName: "Test rol name config 2"
        };
        const roleConfigService = tsyringe_1.container.resolve(roleConfig_service_1.RoleConfigService);
        const result = await roleConfigService.createConfigRole(rolConfig);
        console.log("📄 Configuración de Role encontrada y activada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateRoleConfig().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateRoleConfig.js.map