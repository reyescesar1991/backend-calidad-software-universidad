"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestActivateRole = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const idRole = validations_1.objectIdSchema.parse("681cbf83983a4218cb3de111");
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.activateRole(idRole);
        console.log("📄 Role activado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestActivateRole().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testActivateRole.js.map