"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../core/config/dependenciesPermissions/dependencies");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestDeletePermissionRole = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const roleId = "06";
        const permissionId = 'ver_listar_productos';
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.deletePermissionRole(roleId, permissionId);
        console.log("📄 Permisos del rol actualizados:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestDeletePermissionRole().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testDeletePermissionRole.js.map