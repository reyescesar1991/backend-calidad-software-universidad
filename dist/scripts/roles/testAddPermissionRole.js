"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestAddPermissionRole = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const idRole = '06';
        const permissionKey = 'modificar_producto';
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.addPermissionRole(idRole, permissionKey);
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
runTestAddPermissionRole().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testAddPermissionRole.js.map