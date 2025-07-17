"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../core/config/dependenciesPermissions/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const validations_1 = require("../../validations");
const permission_1 = require("../../services/permission");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdatePermission = async () => {
    try {
        const idPermission = validations_1.objectIdSchema.parse("67feaf2eddf80c5ae50f8f2a");
        const data = {
        // isActive : false,
        // can: false,
        // label : "Test Label 2c90893b",
        // permission : "crear_usuario"
        };
        const permissionService = tsyringe_1.container.resolve(permission_1.PermissionService);
        const result = await permissionService.updatePermission(idPermission, data);
        console.log("📄 Permiso actualizado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdatePermission().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdatePermission.js.map