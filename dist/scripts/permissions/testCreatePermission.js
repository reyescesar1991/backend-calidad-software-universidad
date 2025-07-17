"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../core/config/dependenciesPermissions/dependencies"); // Importa las dependencias
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const tsyringe_1 = require("tsyringe");
const Permission_service_1 = require("../../services/permission/Permission.service");
const connectDb_1 = require("../../core/utils/connectDb");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreatePermission = async () => {
    try {
        const uniqueId = (0, uuid_1.v4)().substring(0, 8);
        const testPermission = {
            label: `Test Label 2c90893b`,
            permission: `test_permission_2c90893b`,
            can: true,
        };
        const permissionService = tsyringe_1.container.resolve(Permission_service_1.PermissionService);
        const result = await permissionService.createPermission(testPermission);
        console.log("📄 Permiso creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
runTestCreatePermission().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreatePermission.js.map