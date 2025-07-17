"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestUpdateRole = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const idRole = validations_1.objectIdSchema.parse("681cbf83983a4218cb3de111");
        const updateData = {
            idRole: '06',
            name: "Test-rol-update",
            label: "Test-label-update",
            description: "Test-description-update",
        };
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.updateRole(idRole, updateData);
        console.log("📄 Rol actualizado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateRole().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateRole.js.map