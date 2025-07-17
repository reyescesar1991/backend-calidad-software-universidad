"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const permission_1 = require("../../services/permission");
(0, connectDb_1.initializeTestEnvironment)();
const runTestGetPermissionByStatus = async () => {
    try {
        const valueIsActive = false;
        const permissionService = tsyringe_1.container.resolve(permission_1.PermissionService);
        const result = await permissionService.getPermissionsByStatus(valueIsActive);
        console.log("📄 Permisos encontrados por estatus:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestGetPermissionByStatus().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testGetPermissionByStatus.js.map