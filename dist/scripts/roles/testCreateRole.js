"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../core/utils/connectDb");
const Role_service_1 = require("../../services/role/Role.service");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreateRole = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const role = {
            idRole: '05',
            isDefault: false,
            isActive: true,
            description: 'Rol_test',
            label: 'Rol_test',
            name: 'Rol_test',
            managePermissions: false,
        };
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.createRole(role);
        console.log("📄 Role creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateRole().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateRole.js.map