"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestListRoles = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.listRoles();
        console.log("📄 Roles registrados en la base de datos:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestListRoles().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testListRoles.js.map