"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissionsSecurity/dependencies");
const uuid_1 = require("uuid");
const connectDb_1 = require("../../core/utils/connectDb");
const permissionSecurity_1 = require("../../services/permissionSecurity");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreatePermissionSecurity = async () => {
    try {
        const uniqueId = (0, uuid_1.v4)().substring(0, 8);
        const testPermission = {
            label: `Test Label ${uniqueId}`,
            permission: `test_permission_${uniqueId}`,
            can: true,
            id: `test_permission_${uniqueId}`
        };
        const permissionSecurityService = tsyringe_1.container.resolve(permissionSecurity_1.PermissionSecurityService);
        const result = await permissionSecurityService.createPermissionSecurity(testPermission);
        console.log("📄 Permiso de seguridad creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreatePermissionSecurity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreatePermissionSecurity.js.map