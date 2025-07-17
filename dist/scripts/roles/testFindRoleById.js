"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindRoleById = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const idRole = validations_1.objectIdSchema.parse("67f7f5ff4f0b312a2319fc56");
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.findRoleById(idRole);
        console.log("📄 Role encontrado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindRoleById().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindRoleById.js.map