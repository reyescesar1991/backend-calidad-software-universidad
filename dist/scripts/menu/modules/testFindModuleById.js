"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies");
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const runTestFindModuleById = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const idModule = validations_1.objectIdSchema.parse('67d9d3ef7cdabe03598fde24');
        const moduleService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await moduleService.findModuleById(idModule);
        console.log("📄 Módulo encontrado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindModuleById().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindModuleById.js.map