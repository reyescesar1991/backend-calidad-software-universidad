"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindRoleByCustomId = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const customIdRole = "01";
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.findRoleByCustomId(customIdRole);
        console.log("📄 Role encontrado por ID:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindRoleByCustomId().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindRoleByCustomId.js.map