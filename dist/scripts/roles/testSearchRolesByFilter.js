"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const tsyringe_1 = require("tsyringe");
const Role_service_1 = require("../../services/role/Role.service");
const dependencies_1 = require("../../core/config/dependenciesRoles/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestSearchRolesByFilter = async () => {
    try {
        await (0, dependencies_1.configureDependenciesRoles)();
        const filter = {
            label: "Administrador",
            name: "Gestor de Inventario"
        };
        const roleService = tsyringe_1.container.resolve(Role_service_1.RoleService);
        const result = await roleService.searchRolesByFilters(filter);
        console.log("📄 Role encontrado por filtro:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestSearchRolesByFilter().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testSearchRolesByFilter.js.map