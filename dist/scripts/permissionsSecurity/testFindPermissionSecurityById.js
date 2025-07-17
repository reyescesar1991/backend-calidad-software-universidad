"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissionsSecurity/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permissionSecurity_1 = require("../../services/permissionSecurity");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindPermissionSecurityById = async () => {
    try {
        const permissionId = validations_1.objectIdSchema.parse("68015e34a346525ca31786cd");
        const permissionSecurityService = tsyringe_1.container.resolve(permissionSecurity_1.PermissionSecurityService);
        const result = await permissionSecurityService.findPermissionSecurityById(permissionId);
        console.log("📄 Permiso de seguridad encontrado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindPermissionSecurityById().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindPermissionSecurityById.js.map