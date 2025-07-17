"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const connectDb_1 = require("../../../core/utils/connectDb");
const runTestFindModuleByCustomId = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const customIdModule = "general-reportsssss";
        const moduleService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await moduleService.findModuleByCustomId(customIdModule);
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
runTestFindModuleByCustomId().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindModuleByCustomId.js.map