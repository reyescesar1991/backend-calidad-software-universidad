"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const permission_1 = require("../../services/permission");
const validations_1 = require("../../validations");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindByIDPermission = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("67f94b58ce9b9cd946bc47f4");
        const permissionService = tsyringe_1.container.resolve(permission_1.PermissionService);
        const result = await permissionService.getPermissionById(idPermission);
        console.log("📄 Permiso encontrado por id:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindByIDPermission().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindPermissionById.js.map