"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissionsSecurity/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permissionSecurity_1 = require("../../services/permissionSecurity");
(0, connectDb_1.initializeTestEnvironment)();
const runTestPermanentlyDeletePermissionSecurity = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("67f7f5b8c9604dfe14db3d51");
        const permissionSecurityService = tsyringe_1.container.resolve(permissionSecurity_1.PermissionSecurityService);
        const result = await permissionSecurityService.permanentlyDeletePermissionSecurity(idPermission);
        console.log("📄 Permiso de seguridad eliminado por id:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestPermanentlyDeletePermissionSecurity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testPermanentlyDeletePermissionSecurity.js.map