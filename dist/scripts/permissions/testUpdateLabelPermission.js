"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permission_1 = require("../../services/permission");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdateLabelPermission = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("67feaf2eddf80c5ae50f8f2a");
        const permissionService = tsyringe_1.container.resolve(permission_1.PermissionService);
        const result = await permissionService.updateLabelPermission(idPermission, "Test Label 2c90893b");
        console.log("📄 Permiso etiqueta actualizada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateLabelPermission().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateLabelPermission.js.map