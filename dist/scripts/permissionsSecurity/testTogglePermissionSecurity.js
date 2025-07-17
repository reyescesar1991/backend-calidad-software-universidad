"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissionsSecurity/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permissionSecurity_1 = require("../../services/permissionSecurity");
(0, connectDb_1.initializeTestEnvironment)();
const runTestTogglePermissionSecurity = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("68015e34a346525ca31786cd");
        const permissionSecurityService = tsyringe_1.container.resolve(permissionSecurity_1.PermissionSecurityService);
        const result = await permissionSecurityService.togglePermissionSecurityActive(idPermission);
        console.log(`Permiso de seguridad ahora ${result.isActive === true ? "activado" : "desactivado"}`, result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestTogglePermissionSecurity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testTogglePermissionSecurity.js.map