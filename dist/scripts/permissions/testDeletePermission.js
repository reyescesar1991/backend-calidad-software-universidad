"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permission_1 = require("../../services/permission");
(0, connectDb_1.initializeTestEnvironment)();
const runTestDeletePermission = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("67f94b58ce9b9cd946bc47f4");
        const permissionService = tsyringe_1.container.resolve(permission_1.PermissionService);
        const result = await permissionService.deletePermission(idPermission);
        console.log("📄 Permiso eliminado logicamente:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestDeletePermission().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testDeletePermission.js.map